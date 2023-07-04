/*
 * @Description:
 * @Author: 李大玄
 * @Date: 2023-07-03 09:25:31
 * @FilePath: /vue-shelf/src/views/MultipleRenderingComponents/utils.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2023-07-03 09:28:55
 */

class FormatterData {
  constructor(originData, tableColumn) {
    this.originalData = [].concat(originData || []); // 原始数据
    this.tableColumnData = [].concat(tableColumn || []); // 原始数据
    this.tableData = [];
    this.luckysheetData = [];
    this.outlineData = []
    this.columnlen = {};
    this.getColumnlen();
    this.formatterToLuckysheet();
  }

  // 获取luckysheet 列宽
  getColumnlen() {
    this.columnlen = {};
    this.tableColumnData.forEach((item, index) => {
      if (item.width) {
        console.log(item.width);
        this.columnlen[index] = parseInt(item.width);
      } else {
        this.columnlen[index] = 100;
      }
    })
  }

  getDataForList(originalData) {
    let celldata = []
    let rowIndex = 1;
    const recursion = (originalData, parent = {}) => {
      for (let i = 0; i < originalData.length; i++) {
        let colIndex = 0;
        const item = originalData[i];
        for (const key in item) {
          if (key != 'children') {
            celldata.push({
              r: rowIndex, c: colIndex,
              v: {m: item[key], v: item[key], key, ct: {fa: "General", t: typeof item[key]}}
            });
          } else {
            continue;
          }
          colIndex = colIndex + 1;
        }
        celldata.push({
          r: rowIndex, c: colIndex,
          v: {m: parent.id, v: parent.id, key: 'pid', disabled: true, ct: {fa: "General", t: typeof parent.id}}
        });
        rowIndex += 1;
        if (item.children && item.children.length) {
          recursion(item.children, item);
        }
      }
    }
    recursion(originalData);
    return celldata;
  }

  formatterToLuckysheet() {
    const list = this.originalData;
    const tableColumnData = [].concat(this.tableColumnData);
    const header = tableColumnData.filter((item) => {
      if (item.width) {
        item.width = item.width.replace("px", "");
      }
      return !item.type;
    });
    const enumT = {
      number: "n",
      string: "g"
    };

    let celldata = [];
    for (let i = 0; i < header.length; i++) {
      celldata.push({
        r: 0,
        c: i,
        v: {
          m: header[i]["label"],
          v: header[i]["label"],
          ct: {fa: "General", t: enumT[typeof header[i]["label"]]}
        }
      });
    }
    const isPid = [].concat(this.originalData).some(item => item.hasOwnProperty('children'));
    if (isPid) {
      celldata.push({
        r: 0, c: header.length,
        v: {
          m: 'pid', v: 'pid', ct: {fa: "General", t: enumT['string']}
        }
      });
    }
    celldata = celldata.concat(this.getDataForList(this.originalData));
    // console.log(JSON.stringify(celldata, null, 2))
    // for (let i = 0; i < list.length; i++) {
    //   const item = list[i];
    //   let index = 0;
    //   for (const key in item) {
    //     celldata.push({
    //       r: i + 1,
    //       c: index,
    //       v: {
    //         m: item[key],
    //         v: item[key],
    //         ct: {
    //           fa: "General",
    //           t: typeof item[key],
    //         },
    //         key
    //       }
    //
    //     });
    //     index = index + 1;
    //   }
    // }
    this.luckysheetData = {
      name: "Sheet1",
      config: {
        merge: {},
        columnlen: this.columnlen
      },
      chart: [],
      color: "", //工作表颜色
      index: 0, //工作表索引
      status: 1, //激活状态
      order: 0, //工作表的下标
      hide: 0, //是否隐藏
      row: list.length + 1, //行数
      column: header.length, //列数
      defaultRowHeight: 19, //自定义行高
      defaultColWidth: 73, //自定义列宽
      celldata
    };
    // this.excelData = data;
    // return []
  }

  cellUpdated(val) {
    this.originalData[val.r - 1][val.newValue.key] = val.newValue.v
  }

  formatterToOutline(val) {

    return []
  }
}


// language
function language(params) {
  var lang = navigator.language || navigator.userLanguage; //常规浏览器语言和IE浏览器
  lang = lang.substr(0, 2); //截取lang前2位字符
  return lang;
}

// Tencent Forum Link Button
function supportButton() {
  const text = language() === 'zh' ? '反馈' : 'Forum';
  const link = language() === 'zh' ? 'https://support.qq.com/product/288322' : 'https://groups.google.com/g/luckysheet';
  // document.querySelector("body").insertAdjacentHTML('beforeend', '<a id="container" href="' + link + '" target="_blank" style="z-index:2;width:50px;height:50px;line-height:50px;position:fixed;right:40px;bottom:86px;border-radius:50px;cursor:pointer;background:rgb(71,133,249);color:#fff;text-align:center;text-decoration:none;">' + text + '</a>');
  document.querySelector("body").insertAdjacentHTML('beforeend', '');
}

supportButton()

/**
 * Get url parameters
 */
function getRequest() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      });
  return vars;
}


let filesObj = {};
// const files = require.context('./demoData', false, /\.(vue|js)$/);
// 根据文件名组织模块对象
// files.keys().map(src => {
//   const match = src.match(/\/(.+)\./);
//   if (match && match.length >= 1) {
//     const name = match[1];
//     const moduleValue = files(src);
//     if (moduleValue.default) {
//       filesObj[name] = moduleValue.default;
//     }
//   }
// });

function isObjArr(value) {
  if (Object.prototype.toString.call(value) === "[object Array]") {
    return 'Array';
  } else if (Object.prototype.toString.call(value) === '[object Object]') {
    return 'Object';
  }
  return false;
}

function getFiles(type) {
  if (isObjArr(type) == 'Array') {
    return Object.values(filesObj)
  } else if (isObjArr(type) == 'Object') {
    return filesObj;
  }
  return {}
}

export default {
  language,
  getRequest,
  getFiles,
  FormatterData
}

