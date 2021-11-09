// let findEle = (parent, type) => {
//   return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
// }

// const trigger = (el, type) => {
//   const e = document.createEvent('htmlEvents')
//   e.initEvent(type, true, true)
//   el.dispatchEvent(e)
// }

// const emoji = {
//   bind: function (el, binding, vnode) {
//     // 正则规则可根据需求自定义
//     var regRule = /[^u4E00-u9FA5|d|a-zA-Z|rns,.?!，。？！…—&$=()-+/*{}[]]|s/g
//     let $inp = findEle(el, 'input')
//     el.$inp = $inp
//     $inp.handle = function () {
//       let val = $inp.value
//       $inp.value = val.replace(regRule, '')

//       trigger($inp, 'input')
//     }
//     $inp.addEventListener('keyup', $inp.handle)
//   },
//   unbind: function (el) {
//     el.$inp.removeEventListener('keyup', el.$inp.handle)
//   },
// }

// export default emoji



let findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
}

const trigger = (el, type) => {
  const e = document.createEvent('htmlEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

const map = {
  emoji: /[^u4E00-u9FA5|d|a-zA-Z|rns,.?!，。？！…—&$=()-+/*{}[]]|s/g,
  a: /^[GCDZTSPKXLY1-9]\d{1,4}$/,
  prot: /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/,
  video: /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i,
  time: /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
  fraction: /^150$|^(?:\d|[1-9]\d|1[0-4]\d)(?:\.5)?$/
}

const emoji = {
  bind: function (el, binding, vnode) {
    const name = binding.rawName.split('.')[1] || '';
    // 正则规则可根据需求自定义
    var regRule = new RegExp(map[name] ? map[name] : /./g);
    console.log({regRule});
    let $inp = findEle(el, 'input');
    console.log($inp);
    el.$inp = $inp;

    $inp.handle = function () {
      let val = $inp.value;
      if (!regRule.test(val)) {
        binding.value(false);
      } else {
        binding.value(true);
      }
      // trigger($inp, 'input')
    }
    $inp.addEventListener('blur', $inp.handle)
  },
  unbind: function (el) {
    el.$inp.removeEventListener('blur', el.$inp.handle)
  },
}

export default emoji