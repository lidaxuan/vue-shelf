/**
 * @Description:  postMessage
 * @Author: 李大玄
 * @Date: 2023/8/18 4:55 PM
 * @FilePath: src/views/exportExcel/postMessage.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2023/8/18 4:55 PM
 * */
import uni from '@/utils/webview.1.5.4.js';

const UtilName = 'PlatToPostMessage';

// 生成唯一id
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 判断是否是一个对象
export function isObject(value) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

// 判断两个对象是否一样   // console.log(equals({a:1,b:2},{b:2,a:1}))
export function equals(obj1, obj2) {
  // 首先判断是否是引用类型
  var f1 = obj1 instanceof Object;
  var f2 = obj2 instanceof Object;
  // 如果有一个不是引用数据类型，那就进行直接判断。（内存地址不同）
  if (!f1 || !f2) {
    return obj1 === obj2
  }
  // 若全是引用类型的，那就先看一下属性值的长度是否相等，若不相等，就直接false啦。
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
  }
  /**
   * 若属性值的长度相等，就接着遍历里边的每一个属性，还是先看里边的属性是哪一个类型，
   * 如果全是引用类型，那就接着对里边的属性调用equals递归函数。
   * 如果不全是引用类型，那就比较这两个值是否相等，若不相等就直接false啦。
   */
  for (var p in obj1) {
    var a = obj1[p] instanceof Object;
    var b = obj2[p] instanceof Object;
    if (a && b) {
      equals(obj1[p], obj2[p])
    } else if (obj1[p] != obj2[p]) {
      return false;
    }
  }
  return true;
}

// 传参对象 示例
const optionsDemo = {
  id: guid(), // 必传
  fnName: 'xxx', // 父页面暴露在window 上的方法 必传
  query: {} // 非必传 参数
}

// 校验参数
function verifyOptions(options) {
  if (!isObject(options)) {
    throw new Error(`${UtilName}: 参数是一个对象: {}`);
    return false;
  }
  if (!options.id) {
    throw new Error(`${UtilName}: 需要传一个id: {id: xxxx}, 且不能重复!!!`);
    return false;
  }
  if (!options.fnName) {
    throw new Error(`${UtilName}: 需要传一个父页面已暴露的方法名`);
    return false;
  }
  return options;
}

// 构造函数
function PostPlat() {
  this.cache_store = {};  // 子页面缓存穿过来的options 对象
  this.cache_window = {}; // 父页面缓存Iframe 对象 不用重复获取
}

function initMixin(OperandObject) {
  /**
   * @param options id:  必传
   * @param options fnName: 'xxx',  父页面暴露在window 上的方法 必传
   * @param options query: {},  非必传 参数
   */
  OperandObject.prototype.targetParent = function (options) {
    return new Promise((resolve, reject) => {
      if (!verifyOptions(options)) {
        reject(`${UtilName}: 参数传递不正确!!  \n 正确格式为 \n Demo: ${JSON.stringify(optionsDemo, null, 2)}`);
        return false;
      }
      if (this.cache_store[options.id]) {
        if (equals(this.cache_store[options.id], options)) {
          // console.warn(`${UtilName}: id: ${options.id} 已使用过, 是否要重复使用, 建议更换Id.`);
        } else if (this.cache_store[options.id].id == options.id) {
          console.warn(`${UtilName}: id: ${options.id} 已使用过, 是否要重复使用, 建议更换Id.`);
        }
      }
      this.cache_store[options.id] = options

      function ListenerFn(event) {
        resolve(event.data);
      }

      window.onmessage = ListenerFn; //  避免多次触发    先绑定在触发
      window.parent.postMessage(options, '*');
      window[options.fnName] = (data) =>  {
        // resolve(event.data);
        console.log('asdasdasd', data)
      }
      uni.postMessage({data: options});

      // window.addEventListener('message', (event) => {
      //   console.log("子组件收到消息:"+JSON.stringify(event.data) +  ',' + event.origin)
      //   event.source.postMessage('回复:123456',event.origin)
      // }, false);
    });
  };


  /**
   * @description 父页面接收子页面方法 并执行调用
   */
  OperandObject.prototype.respondsToSelector = function () {
    window.onmessage = (event) => {
      if (event.data && event.data.id && event.data.fnName) {
        // console.log('event.data', event.data);
        window[event.data.fnName](event.data)
      }
    }
  };

  /**
   * @description 父页面将参数传给子页面
   * @param {Object} iframeName iframe name
   * @param {Object} options 参数
   */
  OperandObject.prototype.targetIframe = function (iframeName, options) {
    if (!window.frames[iframeName]) {
      console.warn(`${UtilName}: iframeName: ${iframeName} 不存在, 请确认 <Iframe> 标签上绑定了 name 属性.`);
      return;
    }
    let content = null;
    if (this.cache_window[iframeName]) {
      content = this.cache_window[iframeName];
    } else {
      content = window.frames[iframeName];
      this.cache_window[iframeName] = content;
    }
    if (content && !content.window) {
      console.warn(`${UtilName}:  请确认 iframeName: ${iframeName} 绑定在<Iframe>标签的 name 属性.`);
      return;
    }

    content.window.postMessage(options, '*')
  }
}

initMixin(PostPlat);

// const PostMessage = new PostPlat();
export default new PostPlat();