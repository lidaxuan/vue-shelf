<!--
 * @Description:  
 * @Author: 李大玄
 * @Date: 2022-03-02 15:44:53
 * @FilePath: /vue-shelf/src/views/ImplementationComponent/viewComp/viewComp.vue
-->
<template lang="pug" src="./template/index.pug">
</template>

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
      dialogData: {},
      loading: false,
      // 接口请求来的config
      totalNumber: 0,
      pageNumber: 1,
      pageSize: 10,
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
      pageUrl: {}, //  url
      visible: false,
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
    forMatConfig() {
      this.defaultConfig.struct.viewTemplate = JSON.parse(this.defaultConfig.struct.viewTemplate);
      for (let i = 0, len = this.defaultConfig.attributes.length; i < len; i++) {
        if (this.defaultConfig.attributes[i].columnUiPlugin) {
          this.defaultConfig.attributes[i].columnUiPlugin = JSON.parse(this.defaultConfig.attributes[i].columnUiPlugin);
        }
      }
      const {
        struct: {
          viewTemplate: { search, pageUrl }
        }
      } = this.defaultConfig;
      this.pageUrl = pageUrl;
      this.pageNumber = search.pageNo;
      this.pageSize = search.pageSize;

      this.searchMap = getSceneData(this.defaultConfig, 'search');
      this.isNeedOptions(this.searchMap);
      this.fetchData();
      this.getTableColumnData();
      this.createMap = getSceneData(this.defaultConfig, 'create');
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
    async isNeedOptions(sceneMap) {
      for (let i = 0, len = sceneMap.sceneOptions.length; i < len; i++) {
        if (sceneMap.sceneOptions[i].columnUiPlugin.compName == 'select') {
          if (!sceneMap.sceneOptions[i].columnUiPlugin.options.length && sceneMap.sceneOptions[i].columnUiPlugin.url) {
            sceneMap.sceneOptions[i].columnUiPlugin.options = await this.fetchSelectOptions(sceneMap.sceneOptions[i].columnUiPlugin.url);
          }
        }
      }
      return;
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
        console.log(1);
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
        isPage: viewTemplate.search.isPage,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        totalNumber: this.totalNumber || 0,
        slotArr: viewTemplate.tableConfigSlot
      };
      return obj;
    },
    // 获取表格列
    getTableColumnData() {
      this.tableColumnData = this.defaultConfig.attributes.filter((item) => {
        item.prop = item.mappingClassField;
        item.label = item.columnLabel;
        item = Object.assign(item, item.columnUiPlugin.tableColumnConfig);
        return item.showInList == 1;
      });
    },
    // --------------------------
    fetchData() {
      const {
        struct: {
          viewTemplate: { search }
        }
      } = this.defaultConfig;
      const query = {
        pageNo: search.pageNum,
        pageSize: search.pageSize,
        ...search.defaultValue
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
      this.multipleSelection = val;
    },
    tableHandle(row, btn) {
      this.rowData = Object.assign({}, row);
      this.dialogData = Object.assign({}, btn);
      switch (btn.showType) {
        case 'confirm':
          this.confirmHandle();
          break;
        case 'el-dialog':
          this.visible = true;
          break;

        default:
          this.config[btn.key].visible = true;
          break;
      }
    },
    // 表格中 confirm 操作
    confirmHandle() {
      this.rowData; // 删除所需数据局
      this.dialogData; // 删除所需数据局
      this.$confirm(`${this.dialogData.message || '您确定执行此操作?'}`, `${this.dialogData.title || '提示'}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(this.pageUrl.delete);
          this.$message({ type: 'success', message: '删除成功!' });
        })
        .catch(() => {
          this.$message({ type: 'info', message: `已取消${this.dialogData.title}` });
        });
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
</style>