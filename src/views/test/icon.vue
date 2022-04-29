<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-08-05 09:45:21
 * @FilePath: /vue-shelf/src/views/test/icon.vue
-->
<template>
  <div class="asdasdassds">
    <div style="width: 600px; height: 600px; background: pink; margin: 50px" class="father">
      
    </div>
    <div v-draggable class="asdasd">1 1</div>
    <input type="text" v-focus class="mt10 ml20">
    
    <!-- 
    <div class="box p10">
      <IconFont type="icon-qianmingguanli" fill="red" data-active="green" active="green" size="20"></IconFont>
    </div>
    <Preview doMain="https://dss2.bdstatic.com" src="/lfoZeXSm1A5BphGlnYG/skin/749.jpg?2" width="400" radius="80" :height="400"></Preview>
    <br />
    <pre>{{ asaaaaaaaaa }}</pre> -->
    {{cache}}
    <div style="height: 360px">
      <!-- <multiple-checkbox
        :readio="readio"
        ref="multipleCheckbox"
        search
        :placeholder="`请搜索${label}`"
        :getColumnServer="getMultipleCheckboxList"
        @change="onMultipleCheckboxChange"
        @load="onMultipleCheckboxLoad"
      ></multiple-checkbox> -->

      <!-- <multiple-checkbox
        ref="multipleCheckbox"
        search :readio="false" :preview="true"
        placeholder="请输入地域名称进行搜索"
        :getColumnServer="getMultipleCheckboxList"
        @change="onMultipleCheckboxChange"
        @load="onMultipleCheckboxLoad"
        :topLevel="topLevel"
      ></multiple-checkbox> -->
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import _ from 'lodash';
import Preview from '@/components/Preview/image';
import MultipleCheckbox from '@/components/multiple-checkbox';
import { getRegionArea, getRegionCity } from '@/model/mock/mock';
import safeGet from '@lijixuan/safe-get';
export default {
  name: '', // Pascal命名
  mixins: [],
  //import引入的组件需要注入到对象中才能使用
  components: { Preview, Timer, MultipleCheckbox },
  props: {},
  //这里存放数据
  data() {
    return {
      cache: [],
      label: '名称',
      readio: false,
      form: {
        value: [
          {
            id: 'ec697e33caf047a98db03200123f2662',
            form: {
              value: ['137101101100100', '137101102100100', '137101103100100'],
              valueName: ['北京', '天津', '河北'],
              indeterminate: [],
              forkName: '',
              conditionType: 'CONDITION',
              valueType: 'IN',
              type: 'NORMAL',
            },
          },
        ],
      },
    };
  },
 
  //监听属性 类似于data概念
  computed: {
    timeList() {
      return format(this.asaaaaaaaaa);
    },
    topLevel: () => 0,
  },
  created() {},
  methods: {
    async getMultipleCheckboxList(query) {
      if (query && query.id === this.topLevel) {
        try {
          const list = await getRegionArea();
          const array = _.map(list, (item) => {
            return {
              pid: this.topLevel,
              id: String(item.provinceId),
              name: item.name,
              isHaveSon: item.pid ? true : false,
            };
          });
          console.log(array);
          const childrens = _.map(_.compact([].concat(safeGet(this.data, 'form.indeterminate'))), (id) => {
            return this.getMultipleCheckboxList({ id: String(id) });
          });
          const childrenList = await Promise.all(childrens);
          return [].concat(array, _.flattenDeep(childrenList));
        } catch (error) {
          // todo
        }
      } else {
        try {
          const list = await getRegionCity({ provinceId: query.id });
          return _.map(list, (item) => {
            return {
              pid: query.id,
              id: String(item.cityId),
              name: item.name,
              isHaveSon: false,
            };
          });
        } catch (error) {
          // todo
        }
      }
      return [];
    },
    onMultipleCheckboxChange(cache) {
      this.cache = cache;
    },
    onMultipleCheckboxLoad() {
      const $dom = this.$refs.multipleCheckbox;
      $dom.setAutoChecked(this.form.value);
    },
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.box {
  width: 200px;
  height: 100px;
  background: pink;
  margin-left: 500px;
  margin-top: 200px;
}
// .asdasdassds {
//   position: relative;
// }
.father {
  position: relative;
  
}
.asdasd {
  background:red;
  position: absolute;
  top: 100px;
  width: 100px;
  height: 100px;
  left: 100px;
}
</style>