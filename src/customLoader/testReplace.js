const reg = /console\.log\(.*\)/g;
module.exports = function (srcCode) {
  // console.log('srcCode', srcCode)
  // const data = srcCode.replace(reg, '');
  return srcCode.replace('八嘎', '大玄');
}