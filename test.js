/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-10-11 17:15:54
 * @FilePath: /vue-shelf/test.js
 */
var str = '//at.alicdn.com/t/font_2705060_m17nawa8o8.js';
console.log(str.match('.css'));


var fireCount = 0;
var start = new Date;
var timer = setInterval(() => {
  if (new Date - start > 1000) {
    clearInterval(timer);
    console.log(fireCount);
    return
  }
  fireCount++;
}, 0);

// console.assert(11)



// console.log(1);

// setTimeout(() => {
//   console.log(2);
// }, 0);
// process.nextTick(() => {
//   console.log(3);
// })
// setTimeout(() => {
//   console.log(4);
// }, 1000);

// console.log(5);

// process.nextTick(() => {
//   console.log(6);
// })

// function add(x) {
//   var sum = x;
//   var tmp = function (y) {
//     sum = sum + y;
//     return tmp;
//   };
//   tmp.toString = function () {
//     return sum;
//   };
//   return tmp;
// }
// var result = add(1)(2)(3)(4);
// console.log(result);



// function add(a, b, callback) {
//   process.nextTick(() => {
    
//   })
// }


// const res = add(1, 2);
// add(1, 2, (res) => {
//   console.log(res);
// });



var domain = require('domain').create();
domain.run(() => {
  setTimeout(() => {
      throw new Error("listen to me")
  }, 50);
})

domain.on('error', function (err) {
  console.log('Error');
})