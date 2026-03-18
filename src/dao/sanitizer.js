/**
 * 类型判断工具
 */
const isObject = v => Object.prototype.toString.call(v) === '[object Object]';
const isString = v => typeof v === 'string';

/**
 * 禁止的标签（整体转义，不解析、不执行）
 */
const forbiddenTags = ["script", "iframe", "object", "embed", "applet", "meta", "link", "math", "base", "noscript"];

/**
 * 禁止的属性名（只对「非危险标签」生效）
 */
const forbiddenAttrNames = ["on[a-z]+", "innerHTML", "outerHTML", "formaction", "xlink:href"];

/**
 * 禁止的协议
 */
const forbiddenProtocols = ["javascript:", "vbscript:", "data:text/html", "data:text/javascript", "livescript:", "mocha:", "about:blank?javascript"];

/**
 * Style 内容过滤
 */
function sanitizeStyle(styleText) {
  if (!styleText) return "";
  let s = styleText;

  // 移除危险协议
  forbiddenProtocols.forEach(proto => {
    s = s.replace(new RegExp(proto, "gi"), "");
  });

  // url(javascript:)
  s = s.replace(/url\((.*?)\)/gi, (m, content) => {
    for (const proto of forbiddenProtocols) {
      if (new RegExp(proto, "i").test(content)) {
        return "url(#)";
      }
    }
    return m;
  });

  // expression / -moz-binding / behavior
  s = s.replace(/expression\s*\(/gi, "");
  s = s.replace(/-moz-binding/gi, "");
  s = s.replace(/behavior\s*:/gi, "");

  return s;
}

/**
 * HTML 字符串净化
 */
function sanitizeString(html) {
  if (!html) return html;
  let res = html;

  /**
   * 0️⃣ 必须最先移除 HTML 注释
   * 否则 < 会被转义，<!-- --> 永远匹配不到
   */
  res = res.replace(/<!--[\s\S]*?-->/g, "");

  /**
   * 1️⃣ 危险标签：整块转义（iframe / script / svg / ...）
   */
  if (forbiddenTags.length) {
    // 成对标签
    const blockTagRegex = new RegExp(`<(${forbiddenTags.join("|")})([\\s\\S]*?)<\\/\\1>`, "gi");
    res = res.replace(blockTagRegex, m =>
      m.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    );

    // 自闭合 / 单标签
    const singleTagRegex = new RegExp(`<\\/?(${forbiddenTags.join("|")})(?:\\s[^>]*?)?>`, "gi");
    res = res.replace(singleTagRegex, m =>
      m.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    );
  }

  /**
   * svg href / xlink:href（兜底）
   */
  res = res.replace(/<svg[\s\S]*?>[\s\S]*?<\/svg>/gi, svgBlock => svgBlock.replace(/\s+(?:xlink:href|href)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, ""));

  /**
   * 2️⃣ 移除危险属性（仅普通标签）
   */
  if (forbiddenAttrNames.length) {
    const attrRegex = new RegExp(`\\s+(?:${forbiddenAttrNames.join("|")})\\s*=\\s*(?:"[\\s\\S]*?"|'[\\s\\S]*?'|[^\\s>]+)`, "gi");
    res = res.replace(attrRegex, "");
  }

  /**
   * 3️⃣ 清理 style
   */
  res = res.replace(/style\s*=\s*"(.*?)"/gi, (_, css) => `style="${sanitizeStyle(css)}"`);
  res = res.replace(/style\s*=\s*'(.*?)'/gi, (_, css) => `style='${sanitizeStyle(css)}'`);

  /**
   * 4️⃣ 清理 href
   */
  res = res.replace(/href\s*=\s*"(.*?)"/gi, (_, v) => `href="${sanitizeStyle(v)}"`);
  res = res.replace(/href\s*=\s*'(.*?)'/gi, (_, v) => `href='${sanitizeStyle(v)}'`);

  /**
   * 5️⃣ 二次兜底 javascript:
   */
  res = res.replace(/href\s*=\s*"(javascript:[^"]*)"/gi, `href="#"`);
  res = res.replace(/href\s*=\s*'(javascript:[^']*)'/gi, `href="#"`);

  return res;
}


/**
 * 深度净化 Payload
 */
export function xssSanitizePayload(payload, parentKey = '') {
  if (payload === null || payload === undefined || payload === '' || payload === false) {
    return payload;
  }

  if (isString(payload)) {
    return sanitizeString(payload);
  }

  if (Array.isArray(payload)) {
    return payload.map(item => xssSanitizePayload(item, parentKey));
  }

  if (isObject(payload)) {
    const out = {};
    for (const key in payload) {
      if (!Object.prototype.hasOwnProperty.call(payload, key)) continue;
      out[key] = xssSanitizePayload(payload[key], key);
    }
    return out;
  }

  return payload;
}
