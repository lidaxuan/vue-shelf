/**
 * 类型判断工具
 */
const isObject = v => Object.prototype.toString.call(v) === '[object Object]';
const isString = v => typeof v === 'string';
// 禁止的标签（整个标签直接转义）
export const forbiddenTags = ["script", "iframe", "object", "embed", "applet", "meta", "link", "svg", "math", "base", "noscript"];

// 禁止的属性名（style 保留）
export const forbiddenAttrNames = ["on[a-z]+", "srcdoc", "innerHTML", "outerHTML", "formaction", "xlink:href"];

// 禁止的协议（js 注入）
export const forbiddenProtocols = ["javascript:", "vbscript:", "data:text/html", "data:text/javascript", "livescript:", "mocha:", "about:blank?javascript"];

// --- Style 过滤 ---
function sanitizeStyle(styleText) {
  if (!styleText) return "";
  let s = styleText;
  // 去掉 javascript: / vbscript:
  forbiddenProtocols.forEach(proto => {
    const re = new RegExp(proto, "gi");
    s = s.replace(re, "");
  });
  // 去掉 url(javascript:)
  s = s.replace(/url\((.*?)\)/gi, (m, content) => {
    if (/javascript:|vbscript:|data:text\/html/gi.test(content)) {
      return "url(#)";
    }
    return m;
  });
  // expression() （IE）
  s = s.replace(/expression\s*\(/gi, "");
  // -moz-binding
  s = s.replace(/-moz-binding/gi, "");
  // behavior: url()
  s = s.replace(/behavior\s*:/gi, "");
  return s;
}


// --- 主函数 ---
export function sanitizeString(html) {
  if (!html) return html;
  let res = html;

  // 1. 转义禁止标签（整个标签内容都转义）
  if (forbiddenTags.length) {
    const blockTagRegex = new RegExp(`<(${forbiddenTags.join("|")})([\\s\\S]*?)<\\/\\1>`, "gi");
    res = res.replace(blockTagRegex, match =>
      match.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    );

    const singleTagRegex = new RegExp(`<\\/?(?:${forbiddenTags.join("|")})(?:\\s[^>]*?)?>`, "gi");
    res = res.replace(singleTagRegex, match =>
      match.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    );
  }

  // 2. 移除危险属性（onerror/onload/onclick/srcdoc/...）
  if (forbiddenAttrNames.length) {
    const attrRegex = new RegExp(`\\s(?:${forbiddenAttrNames.join("|")})\\s*=\\s*(?:"[^"]*"|'[^']*'|[^\\s>]+)`, "gi");
    res = res.replace(attrRegex, "");
  }

  // 3. 清理 style="..." 中的危险内容
  res = res.replace(/style\s*=\s*"(.*?)"/gi, (match, css) => {
    return `style="${sanitizeStyle(css)}"`;
  });

  res = res.replace(/style\s*=\s*'(.*?)'/gi, (match, css) => {
    return `style='${sanitizeStyle(css)}'`;
  });

  // 4. 清理 href="javascript:xxx"
  res = res.replace(/href\s*=\s*"(javascript:[^"]*)"/gi, `href="#"`);
  res = res.replace(/href\s*=\s*'(javascript:[^']*)'/gi, `href="#"`);

  return res;
}

/**
 * 深度净化 Payload
 */
export function sanitizePayload(payload, parentKey = '') {
  if (payload == null) return payload;

  // string
  if (isString(payload)) {
    return sanitizeString(payload);
  }

  // array
  if (Array.isArray(payload)) {
    return payload.map(item => sanitizePayload(item, parentKey));
  }

  // object
  if (isObject(payload)) {
    const out = {};
    for (const key in payload) {
      if (!Object.prototype.hasOwnProperty.call(payload, key)) continue;
      out[key] = sanitizePayload(payload[key], key);
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
  } catch {
  }
}


