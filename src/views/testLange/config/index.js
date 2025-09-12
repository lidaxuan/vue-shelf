/*
 * @Description:
 * @Author: 李大玄
 * @Date: 2023-11-29 09:39:52
 * @FilePath: /vue-shelf/src/views/testLange/config/index.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023-11-29 10:51:19
 */
window.$CONFIG = {
  lang: "en",
  version: "2023年11月29日09:46:48",
  suffixText: "Config"
}
const configMap = {};
const files = require.context('./', false, /\.(vue|js)$/);
files.keys().map(src => {
  const match = src.match(/\/(.+)\./);
  if (match && match.length >= 1) {
    const moduleValue = files(src);
    if (moduleValue.default) {
      configMap[match[1]] = moduleValue.default;
    }
  }
});

function isObject(value) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}

/* 合并对象, 将两个不同语音的对象配置合并 default 是最全的 */
function mergeObjects(obj1, obj2) {
  for (let key in obj2) {
    if (obj2[key] instanceof Array && obj1[key] instanceof Array) {
      obj1[key] = obj1[key].concat(obj2[key]);
    } else if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
      obj1[key] = mergeObjects(obj1[key], obj2[key]);
    } else {
      obj1[key] = obj2[key];
    }
  }
  return obj1;
}

//  将 className.join(" ")
function processObject(obj) {
  for (let key in obj) {
    if (isObject(obj[key]) && !Array.isArray(obj[key])) {
      obj[key] = processObject(obj[key]);
    } else if (key === "className") {
      obj[key] = obj[key].join(" ");
    }
  }
  return obj;
}

const { suffixText, lang } = window.$CONFIG;
export default processObject(mergeObjects(configMap[`default${suffixText}`], configMap[`${lang}${suffixText}`]));
