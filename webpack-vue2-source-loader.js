const { parseComponent } = require('vue-template-compiler');
const path = require('path');


module.exports = function(source) {
  const callback = this.async();
  const filePath = this.resourcePath;
  const relativePath = path.relative(process.cwd(), filePath);


  const sfc = parseComponent(source, { pad: 'line' });
  if (!sfc.template) {
    return callback(null, source);
  }


// 在 template 的根标签后注入 data 属性
  const template = sfc.template.content;
  const injected = template.replace(
    /(\<\w+)/, // 匹配根元素开始标签
    `$1 data-source-file="${relativePath}"`
  );


// 替换 template 部分
  const newSource = source.replace(sfc.template.content, injected);
  callback(null, newSource);
};
