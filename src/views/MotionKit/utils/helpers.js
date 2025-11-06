// src/utils/helpers.js
// rAF 封装、时间、keyframe 解析、transform 解析与插值、样式应用

export function requestAnimFrame(cb) {
  return window.requestAnimationFrame(cb);
}

export function cancelAnimFrame(id) {
  if (id) window.cancelAnimationFrame(id);
}

export function now() {
  return (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
}

/**
 * parseKeyframes(raw)
 * 支持两种格式：
 * 1) [{ "0%": {opacity:0} }, { "50%": {...} }, { "100%": {...} }]
 * 2) [{...}, {...}] // will be evenly distributed from 0..1
 *
 * 返回: [ { t:0..1, props: {...} }, ... ] 已按 t 排序
 */
export function parseKeyframes(raw) {
  if (!Array.isArray(raw)) return [];
  if (raw.length === 0) return [];

  // detect percent style: first item is object with single key that ends with '%'
  var first = raw[0];
  var firstKeys = Object.keys(first);
  var percentMode = false;
  if (firstKeys.length === 1 && typeof firstKeys[0] === 'string' && firstKeys[0].indexOf('%') > -1) {
    percentMode = true;
  }

  if (percentMode) {
    var out = raw.map(function (entry) {
      var key = Object.keys(entry)[0];
      var pct = parseFloat(key.replace('%', '').trim()) / 100;
      var props = entry[key] || {};
      return { t: pct, props: props };
    });
    out.sort(function (a, b) { return a.t - b.t; });
    return out;
  } else {
    var n = raw.length;
    if (n === 1) return [{ t: 0, props: raw[0] }];
    var arr = raw.map(function (props, idx) {
      return { t: idx / (n - 1), props: props };
    });
    return arr;
  }
}

/**
 * parseTransform(transformStr)
 * 简单解析 translate/scale/rotate，返回对象：
 * { translateX: number, translateY: number, scale: number, rotate: number }
 */
export function parseTransform(transformStr) {
  var out = { translateX: 0, translateY: 0, scale: 1, rotate: 0 };
  if (!transformStr || typeof transformStr !== 'string') return out;

  // translate(x,y) or translateX(...) or translateY(...)
  var m = /translate\(\s*([-\d.]+)px(?:\s*,\s*([-\d.]+)px)?\s*\)/i.exec(transformStr);
  if (m) {
    out.translateX = parseFloat(m[1]);
    if (m[2] !== undefined) out.translateY = parseFloat(m[2]);
  } else {
    var mx = /translateX\(\s*([-\d.]+)px\s*\)/i.exec(transformStr);
    var my = /translateY\(\s*([-\d.]+)px\s*\)/i.exec(transformStr);
    if (mx) out.translateX = parseFloat(mx[1]);
    if (my) out.translateY = parseFloat(my[1]);
  }

  var ms = /scale\(\s*([-\d.]+)\s*\)/i.exec(transformStr);
  if (ms) out.scale = parseFloat(ms[1]);

  var mr = /rotate\(\s*([-\d.]+)deg\s*\)/i.exec(transformStr);
  if (mr) out.rotate = parseFloat(mr[1]);

  return out;
}

/**
 * interpolateTransform(a,b,t) -> CSS transform string
 */
export function interpolateTransform(a, b, t) {
  var tx = (a.translateX || 0) + ((b.translateX || 0) - (a.translateX || 0)) * t;
  var ty = (a.translateY || 0) + ((b.translateY || 0) - (a.translateY || 0)) * t;
  var s = (a.scale || 1) + ((b.scale || 1) - (a.scale || 1)) * t;
  var r = (a.rotate || 0) + ((b.rotate || 0) - (a.rotate || 0)) * t;
  var parts = [];
  if (Math.abs(tx) > 1e-6 || Math.abs(ty) > 1e-6) parts.push('translate(' + tx + 'px, ' + ty + 'px)');
  if (Math.abs(s - 1) > 1e-6) parts.push('scale(' + s + ')');
  if (Math.abs(r) > 1e-6) parts.push('rotate(' + r + 'deg)');
  return parts.join(' ');
}

/**
 * applyStyleObject(el, styleObj)
 * 将 styleObj 中的属性直接赋给元素样式（值为字符串或数字）
 */
export function applyStyleObject(el, styleObj) {
  if (!el || !el.style) return;
  var keys = Object.keys(styleObj || {});
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var v = styleObj[k];
    try {
      el.style[k] = v == null ? '' : String(v);
    } catch (e) {
      // ignore invalid style names
    }
  }
}
