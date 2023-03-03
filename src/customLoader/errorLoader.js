const reg = /console\.log\(.*\)/g;
module.exports = function (srcCode) {
  // console.log('srcCode', srcCode)
  return srcCode.replace('李大玄', '大玄');
}