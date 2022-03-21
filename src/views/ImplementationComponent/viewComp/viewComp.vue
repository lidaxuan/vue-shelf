<!--
 * @Description:  
 * @Author: 李大玄
 * @Date: 2022-03-02 15:44:53
 * @FilePath: /vue-shelf/src/views/ImplementationComponent/viewComp/viewComp.vue
-->
<template lang="pug" src="./template/index.pug"></template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import _ from 'lodash';
import { required, getSceneData } from './util';

import uuid from 'uuid';
export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {
    config: Object,
    search: Object
  },
  data() {
    return {
      selectKey: uuid(),
      tableData: [],
      rowData: {},
      handleBtnInfo: {},
      loading: false,
      // 接口请求来的config
      totalNumber: 0,
      pageNumber: 1,
      pageSize: 10,
      isPage: false,
      multipleSelection: [], // 表格多选
      defaultConfig: {},
      tableColumnData: [],
      searchMap: {
        sceneOptions: [],
        defaultValue: {}
      },
      createMap: {
        sceneOptions: [],
        defaultValue: {}
      },
      editMap: {
        sceneOptions: [],
        defaultValue: {}
      },
      pageUrl: {}, //  url
      visible: false,
      tableTopHandleBox: [] // 表格顶部按钮盒子
    };
  },
  computed: {},
  watch: {
    config: {
      handler(newVal, oldVal) {
        this.defaultConfig = _.cloneDeep(Object.assign({}, newVal));
        this.forMatConfig();
      },
      deep: true, // 深度
      immediate: true // 立即执行
    }
  },
  beforeCreate() {},
  created() {
    // this.fetchData();
  },
  beforeMount() {},
  mounted() {},
  methods: {
    async forMatConfig() {
      this.defaultConfig.struct.viewTemplate = JSON.parse(this.defaultConfig.struct.viewTemplate);
      for (let i = 0, len = this.defaultConfig.attributes.length; i < len; i++) {
        if (this.defaultConfig.attributes[i].columnUiPlugin) {
          this.defaultConfig.attributes[i].columnUiPlugin = JSON.parse(this.defaultConfig.attributes[i].columnUiPlugin);
        }
      }
      const {
        struct: {
          viewTemplate: { pageSize, pageNum, isPage, pageUrl, tableTopHandleBox }
        }
      } = this.defaultConfig;
      this.pageUrl = pageUrl || {};
      this.pageNumber = pageNum || 1;
      this.pageSize = pageSize || 10;
      this.isPage = isPage || false;
      this.tableTopHandleBox = [].concat(tableTopHandleBox || []);

      await this.isNeedOptions(this.defaultConfig.attributes);
      this.searchMap = getSceneData(this.defaultConfig, 'search');
      this.createMap = getSceneData(this.defaultConfig, 'create');
      this.editMap = getSceneData(this.defaultConfig, 'edit');
      this.getTableColumnData();
      this.fetchData();
    },
    // 获取规则
    getItemRule(item) {
      return [required(item)];
    },
    // 获取显示组件类型
    getComponentType(item) {
      if (!Object.keys(item).length) {
        return;
      }
      if (!['select'].includes(item.columnUiPlugin.compName)) {
        return true;
      }
      return item.columnUiPlugin.compName;
    },
    // 获取 select options
    async isNeedOptions(attributes) {
      for (let i = 0, len = attributes.length; i < len; i++) {
        if (attributes[i].columnUiPlugin.compName == 'select') {
          if (!attributes[i].columnUiPlugin.options.length && attributes[i].columnUiPlugin.url) {
            let res = await this.fetchSelectOptions(attributes[i].columnUiPlugin.url);
            attributes[i].columnUiPlugin.options = res;
          }
        }
      }
    },
    async fetchSelectOptions(url) {
      const pre = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            { name: '易聊', id: '11' },
            { name: '科技', id: '22' }
          ]);
        }, 100);
      });
      const res = await pre;
      return res;
    },
    // 顶部搜索按钮展示类型
    /**
     * @description:
     * @param {*} handleBox type: 1, // 1:默认且追加  2:覆盖
     * @return {*}
     */
    buttonDisplayType(handleBox) {
      if (this.searchMap.sceneOptions.length && handleBox.type == 1) {
        return true;
      }
      return false;
    },
    // 查询
    searchBtn() {
      this.$refs.searchForm.validate((valid) => {
        if (!valid) {
          return;
        }
        this.pageNumber = 1;
        this.fetchData();
      });
    },
    // 重置
    resetBtn() {
      this.$refs.searchForm.resetFields();
      this.searchBtn();
    },
    // 获取表格 attrs
    getAttr() {
      const {
        struct: { viewTemplate }
      } = this.defaultConfig;
      const obj = {
        isPage: this.isPage,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        totalNumber: this.totalNumber || 0,
        slotArr: viewTemplate.tableConfigSlot || {}
      };
      return obj;
    },
    // 获取表格列
    getTableColumnData() {
      this.tableColumnData = this.defaultConfig.attributes
        .map((item) => {
          item.prop = item.mappingClassField;
          item.label = item.columnLabel;
          item = Object.assign({}, item, item.columnUiPlugin, item.columnUiPlugin.tableColumnConfig);
          return item;
        })
        .filter((item) => {
          return item.showInList == 1;
        });
    },
    // --------------------------
    fetchData() {
      // const {
      //   struct: {
      //     viewTemplate
      //   }
      // } = this.defaultConfig;
      const query = {
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        ...this.defaultValue
      };
      let arr = [];
      for (let i = 0; i < 7; i++) {
        arr.push({
          id: uuid(),
          name: `李大玄${i}`,
          sex: Math.floor(Math.random() * 2 + 1),
          age: i
        });
      }
      this.tableData = arr;
      this.totalNumber = 200;
    },
    pageSizeChange(val) {
      this.pageNumber = 1;
      this.pageSize = val;
      this.fetchData();
    },
    pageNumberChange(val) {
      this.pageNumber = val;
      this.fetchData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = [].concat(val || []);
    },
    // 表格内部按钮
    tableHandle(row, btn) {
      this.handleBtnInfo = Object.assign({}, btn);
      // 有场景的 confirm没有场景
      if (this.handleBtnInfo.sceneKey) {
        this[`${this.handleBtnInfo.sceneKey}Map`].defaultValue = Object.assign({}, row);
      } else {
        // 没有场景 例如confirm
        this.rowData = Object.assign({}, row);
      }
      this.setDefaultValue(btn);
    },
    // 表格顶部按钮操作
    tableTopHandleBtn(btn) {
      // multipleSelection 多选配置
      if (btn.multipleSelection && !this.multipleSelection.length) {
        this.$message.info('请先勾选要操作的数据');
        return;
      }
      this.handleBtnInfo = Object.assign({}, btn);
      this.setDefaultValue(btn);
    },
    // 不同场景设置默认值
    setDefaultValue(btn) {
      switch (btn.showType) {
        case 'confirm':
          this.confirmHandle();
          break;
        case 'el-dialog':
          this.visible = true;
          break;
        case 'el-drawer':
          this.visible = true;
          break;

        default:
          break;
      }
    },
    //  confirm 操作
    confirmHandle() {
      this.$confirm(`${this.handleBtnInfo.message || '您确定执行此操作?'}`, `${this.handleBtnInfo.title || '提示'}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          try {
            let query = {};
            // 不论是 表格中 还是表格外 confirm 都没有场景 只有 当前操作的数据
            query = Object.assign(query, this.rowData);
            if (this.handleBtnInfo.multipleSelection && this.multipleSelection.length) {
              if (this.handleBtnInfo.multipleSelectionKey == 'all') {
                query.ids = this.multipleSelection;
              } else {
                query.ids = this.multipleSelection.map((item) => {
                  return item[this.handleBtnInfo.multipleSelectionKey || 'id'];
                });
              }
            }
            console.log(this.handleBtnInfo, query);
            this.multipleSelection = [];
            this.fetchData();
            this.$message({ type: 'success', message: `${this.handleBtnInfo.title || '操作'}成功!` });
          } catch (error) {
            console.log(error);
          }
        })
        .catch(() => {
          this.$message({ type: 'info', message: `已取消${this.handleBtnInfo.title}` });
        });
    },
    // 当前场景对象
    getCurrentSceneMap() {
      return this[`${this.handleBtnInfo.sceneKey}Map`].defaultValue;
    },
    // 提交   只有是弹窗出现 就会有场景
    handleSubmit() {
      console.log(this[`${this.handleBtnInfo.sceneKey}Map`].defaultValue);
      console.log(this.handleBtnInfo);
    }
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
::v-deep .el-drawer__body {
  height: calc(100% - 40px);
}
</style>