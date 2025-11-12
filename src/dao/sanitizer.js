// sanitizer.js
import DOMPurify from 'dompurify';

/**
 * 默认标签与属性白名单
 */
export const DEFAULT_ALLOWED_TAGS = ['b', 'i', 'u', 'strong', 'em', 'br', 'p', 'ul', 'ol', 'li', 'a', 'img', 'h1', 'h2', 'h3', 'span'];

export const DEFAULT_ALLOWED_ATTR = ['href', 'src', 'alt', 'title', 'width', 'height', 'target', 'rel', 'style'];

export const DEFAULT_ALLOWED_CSS = ['color', 'background-color', 'font-size', 'font-family', 'text-align', 'font-weight', 'text-decoration'];

/**
 * 允许保留 HTML 的字段名
 */
export const DEFAULT_HTML_FIELDS = ['content', 'description', 'remark', 'html', 'intro', 'desc', 'message'];

/**
 * 判断某字段是否允许保留 HTML
 */
function isAllowHtmlField(fieldName, customAllowList = []) {
  if (!fieldName) return false;
  const merged = new Set([...DEFAULT_HTML_FIELDS, ...customAllowList]);
  return merged.has(fieldName);
}

/**
 * Hook: 控制属性净化逻辑
 */
(function installHooks() {
  DOMPurify.addHook('uponSanitizeAttribute', function (node, data) {
    const attr = data.attrName?.toLowerCase?.() || '';
    const val = data.attrValue;

    // 移除事件属性
    if (attr.startsWith('on')) {
      data.keepAttr = false;
      return;
    }

    // href/src 协议安全校验
    if ((attr === 'src' || attr === 'href') && typeof val === 'string') {
      const trimmed = val.trim();
      if (!trimmed) {
        data.keepAttr = false;
        return;
      }
      const lower = trimmed.toLowerCase();
      if (lower.startsWith('javascript:') || lower.startsWith('data:')) {
        data.keepAttr = false;
        return;
      }

      if (!/^[a-zA-Z0-9.+-]+:/.test(trimmed) && !trimmed.startsWith('//')) {
        if (trimmed.includes('.') || trimmed.includes('/')) {
          data.attrValue = 'https://' + trimmed;
        }
      }

      try {
        const url = new URL(data.attrValue, window.location.origin);
        const proto = url.protocol.replace(':', '').toLowerCase();
        const safeProto = ['http', 'https', 'mailto', 'tel'];
        if (!safeProto.includes(proto)) {
          data.keepAttr = false;
        }
      } catch {
        data.keepAttr = false;
      }
    }
  });
})();

/**
 * 类型判断工具
 */
const isObject = v => Object.prototype.toString.call(v) === '[object Object]';
const isString = v => typeof v === 'string';

/**
 * 防止 HTML 实体绕过
 */
function decodeEntities(str) {
  if (!isString(str)) return str;
  try {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  } catch {
    return str;
  }
}

/**
 * 对单个字符串执行 DOMPurify 净化
 */
function sanitizeString(value, allowHtml = false) {
  const decoded = decodeEntities(value);
  console.log(value)
  console.log(`-----------`)
  console.log(decoded)
  return DOMPurify.sanitize(decoded, allowHtml ? {
    ALLOWED_TAGS: DEFAULT_ALLOWED_TAGS,
    ALLOWED_ATTR: DEFAULT_ALLOWED_ATTR,
    ALLOWED_CSS_PROPERTIES: DEFAULT_ALLOWED_CSS,
    ALLOW_DATA_ATTR: false,
  } : {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

/**
 * 深度净化 Payload
 */
export function sanitizePayload(payload, customAllowList = [], parentKey = '') {
  if (payload == null) return payload;

  // string
  if (isString(payload)) {
    const allowHtml = isAllowHtmlField(parentKey, customAllowList);
    return sanitizeString(payload, allowHtml);
  }

  // array
  if (Array.isArray(payload)) {
    return payload.map(item => sanitizePayload(item, customAllowList, parentKey));
  }

  // object
  if (isObject(payload)) {
    const out = {};
    for (const key in payload) {
      if (!Object.prototype.hasOwnProperty.call(payload, key)) continue;
      out[key] = sanitizePayload(payload[key], customAllowList, key);
    }
    return out;
  }

  return payload;
}

/**
 * 调试差异（仅开发环境）
 */
export function debugSanitizeDiff(original, sanitized) {
  if (process.env.NODE_ENV === 'production') return;
  try {
    const o = JSON.stringify(original);
    const s = JSON.stringify(sanitized);
    if (o !== s) {
      console.warn('[sanitize diff]', {
        before: original,
        after: sanitized
      });
    }
  } catch {}
}
