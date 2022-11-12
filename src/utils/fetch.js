/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-07-26 14:28:48
 * @FilePath: /vue-shelf/src/utils/fetch.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-11-12 10:30:36
 */
var arr = [
];


addLinkArr(arr);
function addLinkArr(srcArr) {
  let arr = srcArr;
  arr.forEach((item) => {
    if (/\.(?:css)$/.test(item)) {
      addCssByLink(item);
    } else if (item.match('.css')) {
      addCssByLink(item);
    } else if (/\.(?:js)$/.test(item)) {
      addJsByScript(item);
    }
  });
}
function addCssByLink(url) {
  var doc = document;
  var link = doc.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', url);
  var heads = doc.getElementsByTagName('head');
  if (heads.length) heads[0].appendChild(link);
  else doc.documentElement.appendChild(link);
}
function addJsByScript(url) {
  var doc = document;
  const s = document.createElement('script');
  // s.type = "module";
  s.src = url;
  var heads = doc.getElementsByTagName('head');
  if (heads.length) heads[0].appendChild(s);
}