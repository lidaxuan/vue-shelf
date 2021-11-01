/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-08-05 09:46:12
 * @FilePath: /vue-shelf/src/components/IconFont/load.js
 */

function append(src) {
  const body = document.querySelector('body');
  if (src.match('.js')) {
    const script = document.createElement('script');
    script.src = src;
    script.setAttribute('data-namespace', src);
    body.appendChild(script);
  } else if (src.match('.css')) {
    const link = document.createElement('link');
    link.href = src;
    link.setAttribute('rel','stylesheet');
    body.appendChild(link);
  } else {
    const styleTag = document.createElement('style');
    styleTag.innerText = src;
    body.appendChild(styleTag);
  }
}

export default append;
