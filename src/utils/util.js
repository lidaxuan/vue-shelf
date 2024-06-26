export default {
  debounce(func, wait = 50, immediate = false) {
    let timer = null;
    let result;
    let debounced = function (...args) {
      if (timer) {
        clearTimeout(timer)
      }
      if (immediate) {
        let callNow = !timer;
        timer = setTimeout(() => {
          timer = null;
        }, wait);
        if (callNow) {
          result = func.apply(this, args)
        }
      } else {
        timer = setTimeout(() => {
          func.apply(this, args);
        }, wait);
      }
      return result;
    }
    debounced.cancel = function () {
      clearTimeout(timer);
      timer = null;
    };
    return debounced;
  }
}

/**
 * 包裹 DOM 元素
 * @param  {HTMLElement} el      被包裹元素
 * @param  {HTMLElement} wrapEl  包裹元素
 */
export const wrap = (el, wrapEl) => {
  let wrapper = wrapEl || document.createElement('div')
  el.parentNode.insertBefore(wrapper, el)
  el.parentNode.removeChild(el)
  wrapper.appendChild(el)
}
/**
 * 取消包裹 DOM 元素
 * @param  {HTMLElement} el      需要取消包裹的元素
 */
export const unwrap = (el) => {
  Array.prototype.forEach.call(el.childNodes, (child) => {
    el.parentNode.insertBefore(child, el)
  })
  el.parentNode.removeChild(el)
}

/**
 * 获取样式
 * @param  {HTMLElement} el  DOM 元素
 * @param  {String}      key 样式键（可选）
 * @return {String/Object}   样式值/样式表
 */
export const getStyle = (el, key) => {
  let styles = el.ownerDocument.defaultView.getComputedStyle(el, null)
  if (key) return styles[key]
  return styles
}

/**
 * 设置样式
 * @param  {HTMLElement} el     DOM 元素
 * @param  {Object}      styles 样式表
 */
export const setStyle = (el, styles) => {
  let value = null
  for (let key in styles) {
    value = styles[key]
    if (typeof value === 'number') {
      value = [value, 'px'].join('')
    }
    el.style[key] = value
  }
}

/**
 * 获取元素 offset
 * @param  {HTMLElement} el DOM元素
 * @return {Object}         offset 值
 */
export const getOffset = (el) => {
  if (!el) return { top: 0, left: 0 }
  let box = el.getBoundingClientRect()

  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
  }
}

/**
 * 获取元素高度
 * @param  {HTMLElement} el DOM元素
 * @return {Number}         高度值
 */
export const getHeight = (el) => {
  let styles = getStyle(el)
  let height = el.offsetHeight
  let borderTopWidth = parseFloat(styles.borderTopWidth)
  let borderBottomWidth = parseFloat(styles.borderBottomWidth)
  let paddingTop = parseFloat(styles.paddingTop)
  let paddingBottom = parseFloat(styles.paddingBottom)
  return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom
}

/**
 * 获取文档的 scrollTop
 * @return {Number} scroolTop 值
 */
export const getScrollTop = () => {
  return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
}


//返回最近七天的日期
export function getday(days = 1) {
  let daysArr = [];
  var currentDate = new Date();
  for (let i = 0; i <= 24 * days; i += 24) { //今天加上前6天
    let dateItem = new Date(currentDate.getTime() - i * 60 * 60 * 1000); //使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
    let y = dateItem.getFullYear(); //获取年份
    let m = dateItem.getMonth() + 1; //获取月份js月份从0开始，需要+1
    let d = dateItem.getDate(); //获取日期
    m = addZero(m); //给为单数的月份补零
    d = addZero(d); //给为单数的日期补零
    let valueItem = y + '-' + m + '-' + d; //组合
    daysArr.push(valueItem); //添加至数组
  }
  return daysArr;
}

//给日期加0
function addZero(time) {
  if (time.toString().length == 1) {
    time = '0' + time.toString();
  }
  return time;
}
// console.log(getday(6));


export function waitForPropAndDoSomething1(callback) {
  // 使用 Object.defineProperty 定义一个 getter 函数，监视 window.qtFlag 的变化
  Object.defineProperty(window, 'qtFlag', {
    get: function () {
      return this._qtFlag;
    },
    set: function (value) {
      this._qtFlag = value;
      // 当 window.qtFlag 变为 true 时执行回调函数
      if (value === true) {
        callback();
      }
    }
  });
}

function waitForPropAndDoSomething2(callback) {
  // 检查 window.qtFlag 是否为 true
  if (window.qtFlag === true) {
    // 如果是 true，则立即执行回调函数
    callback();
  } else {
    // 如果不是 true，则设置定时器，每隔一段时间检查一次
    const interval = setInterval(() => {
      // 再次检查 window.qtFlag 是否为 true
      if (window.qtFlag === true) {
        // 如果是 true，则清除定时器并执行回调函数
        clearInterval(interval);
        callback();
      }
    }, 1000); // 每隔一秒检查一次
  }
}


export function waitForPropAndDoSomething3(obj, propName, callback) {
  Object.defineProperty(obj, propName, {
    get: function () {
      return this[propName];
    },
    set: function (value) {
      this[propName] = value;
      if (value === true) {
        callback();
      }
    }
  });
}

/* 
// 示例用法
waitForPropAndDoSomething(() => {
  console.log("window.qtFlag 已经变为 true，可以执行某些操作了！");
});
// 示例用法
waitForPropAndDoSomething(() => {
  console.log("window.qtFlag 已经变为 true，可以执行某些操作了！");
}); 
// 模拟 window.qtFlag 的变化
setTimeout(() => {
  window.qtFlag = true;
}, 3000); // 3秒后将 window.qtFlag 设为 true
*/

