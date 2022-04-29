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



/* var domain = require('domain').create();
domain.run(() => {
  setTimeout(() => {
      throw new Error("listen to me")
  }, 50);
})

domain.on('error', function (err) {
  console.log('Error');
}) */


function doHandleMonth(month) {
  var m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
}

function getDay(day) {
  var today = new Date();
  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码

  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
}
console.log(getDay(0));
console.log(getDay(-37));


//返回最近七天的日期
function getday2(days =1) {
  let daysArr = [];
  var currentDate = new Date();
  for (let i = 0; i <= 24 * days; i += 24) { //今天加上前6天
    let dateItem = new Date(currentDate.getTime() - i * 60 * 60 * 1000); //使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
    let y = dateItem.getFullYear(); //获取年份
    let m = dateItem.getMonth() + 1; //获取月份js月份从0开始，需要+1
    let d = dateItem.getDate(); //获取日期
    m = addDate0(m); //给为单数的月份补零
    d = addDate0(d); //给为单数的日期补零
    let valueItem = y + '-' + m + '-' + d; //组合
    daysArr.push(valueItem); //添加至数组
  }
  return daysArr;
}

//给日期加0
function addDate0(time) {
  if (time.toString().length == 1) {
    time = '0' + time.toString();
  }
  return time;
}
console.log(getday2(6));