/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-03-08 17:18:23
 * @FilePath: /vue-shelf/src/views/ImplementationComponent/viewComp/util.js
 */
import DB from '@lijixuan/dblist';
import _ from 'lodash';
import compMap from './components';

export function required(item) {
  return {
    trigger: ['change', 'blur'],
    validator(rule, value, callback) {
      if (_.isArray(value) && value.length) {
        callback();
      } else if (!_.isArray(value) && value) {
        callback();
      } else {
        callback(item.columnUiPlugin.requiredMessage);
      }
    },
    required: item.columnUiPlugin.required || false
  };
}

export function getSceneData(config, scene) {
  if (!config) {
    throw "object config: where cannot be undefined";
  }
  const formIteams = new DB([].concat(config.attributes), 'id');
  const sceneMap = config.struct.viewTemplate;
  let finalMap = {
    sceneOptions: [],
    defaultValue: sceneMap[scene] ? sceneMap[scene].defaultValue : {},
    ...sceneMap[scene]
  };
  // 不同 场景 不同 表单 
  const sceneCompList = [].concat(sceneMap[scene] ? sceneMap[scene].sort : []);
  let flag = false;
  for (let i = 0, len = sceneCompList.length; i < len; i++) {
    let where = {},
      item = {} // sceneMap[scene].sort 可能是对象 可能是字符串
    if (typeof sceneCompList[i] == 'object') {
      flag = true;
      where = { mappingClassField: sceneCompList[i]['mappingClassField'] };
      item = Object.assign({}, sceneCompList[i]);
    } else if (typeof sceneCompList[i] == 'string') {
      flag = false;
      where = { mappingClassField: `${sceneCompList[i]}` };
    }
    let formItem = formIteams.selectOne(where) || {};
    //                                                组件库                                             当前页面公共表单配置    
    formItem.columnUiPlugin = _.cloneDeep(_.assign({}, compMap[formItem.columnUiPlugin.compName] || {}, formItem.columnUiPlugin, item));
    finalMap.sceneOptions.push(Object.assign({}, item, formItem));
  }
  return finalMap || {};
};

export function getTableColumns() {

}