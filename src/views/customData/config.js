
export const name = {
  "displayLabel": true,
  "label": "手机号",
  "tag": "el-input",
  "tagIcon": "password",
  "placeholder": "请输入手机号",
  "span": 24,
  "show-password": true,
  "labelWidth": null,
  "style": {
    "width": "100%"
  },
  "clearable": true,
  "prepend": "前缀",
  "append": "后缀",
  "prefix-icon": "前图标",
  "suffix-icon": "后图标",
  "maxlength": "最多输入",
  "show-word-limit": true,
  "readonly": true,
  "disabled": true,
  "required": true,
  "regList": [
    {
      "pattern": "/^1(3|4|5|7|8|9)\\d{9}$/",
      "message": "手机号格式错误"
    }
  ],
  "changeTag": true,
  "document": "https://element.eleme.cn/#/zh-CN/component/input",
  "formId": 6,
  "renderKey": 1695095012899,
  "layout": "colFormItem",
  "vModel": "mobile",
  "defaultValue": 11
}

export const lineForm = {
  "layout": "rowFormItem",
  "tagIcon": "row",
  "type": "flex",
  "justify": "start",
  "align": "top",
  "layoutTree": true,
  "children": [
    {
      "displayLabel": true,
      "label": "颜色选择",
      "tag": "el-color-picker",
      "tagIcon": "color",
      "defaultValue": null,
      "labelWidth": null,
      "show-alpha": false,
      "color-format": "",
      "disabled": false,
      "required": true,
      "size": "",
      "regList": [],
      "changeTag": true,
      "document": "https://element.eleme.cn/#/zh-CN/component/color-picker",
      "formId": 105,
      "span": 24,
      "renderKey": 1695275675978,
      "layout": "colFormItem",
      "vModel": "field105"
    },
    {
      "displayLabel": true,
      "label": "级联选择",
      "tag": "el-cascader",
      "tagIcon": "cascader",
      "placeholder": "请选择级联选择",
      "defaultValue": [],
      "span": 24,
      "labelWidth": null,
      "style": {
        "width": "100%"
      },
      "props": {
        "props": {
          "multiple": false
        }
      },
      "show-all-levels": true,
      "disabled": false,
      "clearable": true,
      "filterable": false,
      "required": true,
      "options": [
        {
          "id": 1,
          "value": 1,
          "label": "选项1",
          "children": [
            {
              "id": 2,
              "value": 2,
              "label": "选项1-1"
            }
          ]
        }
      ],
      "dataType": "dynamic",
      "labelKey": "label",
      "valueKey": "value",
      "childrenKey": "children",
      "separator": "/",
      "regList": [],
      "changeTag": true,
      "document": "https://element.eleme.cn/#/zh-CN/component/cascader",
      "formId": 104,
      "renderKey": 1695275645658,
      "layout": "colFormItem",
      "vModel": "field104"
    },
    {
      "displayLabel": true,
      "label": "下拉选择",
      "tag": "el-select",
      "tagIcon": "select",
      "placeholder": "请选择下拉选择",
      "span": 24,
      "labelWidth": null,
      "style": {
        "width": "100%"
      },
      "clearable": true,
      "disabled": false,
      "required": true,
      "filterable": false,
      "multiple": false,
      "options": [
        {
          "label": "选项一",
          "value": 1
        },
        {
          "label": "选项二",
          "value": 2
        }
      ],
      "dataType": "static",
      "labelKey": "label",
      "valueKey": "value",
      "regList": [],
      "changeTag": true,
      "document": "https://element.eleme.cn/#/zh-CN/component/select",
      "formId": 103,
      "renderKey": 1695275641785,
      "layout": "colFormItem",
      "vModel": "field103"
    }
  ],
  "document": "https://element.eleme.cn/#/zh-CN/component/layout",
  "formId": 102,
  "span": 24,
  "renderKey": 1695275622892,
  "componentName": "row102",
  "gutter": 4
}

export default Object.assign({}, name)