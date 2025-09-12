/** ViteFileTagPlugin.js */
const fs = require('fs');
const chalk = require('chalk');

function addComponentTag(code, path, mark = 'div', property = 'data-compath') {
  try {
    if (code.indexOf(property) !== -1) {
      console.log(chalk.red(`>>> ${path} 该文件已添加${property}属性`));
      return;
    }
    const firstMarkIndex = code.search(`<${mark}`);
    if (firstMarkIndex !== -1) {
      const firstMark = code.slice(firstMarkIndex);
      const insertIndex = firstMark.indexOf('>');
      if (insertIndex !== -1) {
        const rawIndex = insertIndex + firstMarkIndex;
        const deepResult = rawDeepSearch(
          code.slice(rawIndex),
          path,
          0,
          property,
        );
        const result = `${code.slice(0, rawIndex)}${deepResult}`;
        console.log(chalk.green(`>>> ${path} 完成标记写入`));
        return result;
      }
      return code;
    }
    return code;
  } catch (error) {
    console.log(chalk.red('>>> 读取失败：', error));
  }
}

function rawDeepSearch(content, filePath, tagIdx, property) {
  const group = /<(\w+)[ ]+/.exec(content.slice(tagIdx));
  if (group?.index !== -1 && group?.[0]?.length) {
    const dataCompath = `${property}='${filePath.slice(
      filePath.indexOf('src/'),
    )}'`;
    content = `${content.slice(0, tagIdx + group.index)}${content.slice(
      tagIdx + group.index,
      tagIdx + group.index + group[0].length,
    )}${dataCompath} ${content.slice(tagIdx + group.index + group[0].length)}`;
    tagIdx += group.index + group[0].length + dataCompath.length;
    return rawDeepSearch(content, filePath, tagIdx, property);
  }
  return content;
}

module.exports = function ViteFileTagPlugin({ mark, property }) {
  return {
    load(id) {
      if (id.endsWith('.jsx') || id.endsWith('.tsx')) {
        try {
          const content = fs.readFileSync(id, 'utf-8');
          return addComponentTag(content, id, mark, property);
        } catch (error) {
          console.log(chalk.red('解析失败', error));
        }
      }
    },
  };
}

