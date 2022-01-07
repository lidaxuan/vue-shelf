<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-12-13 17:01:09
 * @FilePath: /vue-shelf/src/components/cascader.vue
-->

<template>
  <div class="">
    <el-cascader
      :key="compkey"
      :options="getOptions"
      v-model="cascarderVal"
      :checkStrictly="true"
      @expand-change="expandChange"
      v-bind="$attrs"
      ref="refHandle"
      class="custom-cas"
      @change="casChange"
    >
      <template slot-scope="{ node, data }">
        <span v-if="node.level == 1"> {{ data.label }} </span>
        <span v-if="node.level == 2"> {{ data.label }} </span>
        <span v-if="node.level == 3">
          <el-input v-model="content" @blur="blur" ref="ipt" class="ipt" style="width: 150px">
            <span slot="suffix" class="el-input__icon">{{ suffix }}</span>
          </el-input>
        </span>
        <!-- {{ getNode(node, data) }} -->
      </template>
    </el-cascader>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {
    label: {
      type: String,
      default: () => '',
    },
    suffix: {
      type: String,
      default: () => '',
    },
    secondOptions: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      cascarderVal: '',
      content: '',
      compkey: Math.random(),
    };
  },
  computed: {
    options() {},
    getOptions() {
      return [
        {
          value: '1',
          label: this.label,
          children: this.getSecond(),
        },
      ];
    },
  },
  watch: {
    // temObj: {
    //   handler(newVal, oldVal) {},
    //   deep: true, // 深度
    //   immediate: true, // 立即执行
    // },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    getSecond() {
      if (!this.secondOptions.length) {
        return [
          {
            value: '1',
            label: '大于',
            children: [{ value: '', label: '' }],
          },
          {
            value: '2',
            label: '小于',
            children: [{ value: '', label: '' }],
          },
          {
            value: '3',
            label: '等于',
            children: [{ value: '', label: '' }],
          },
        ];
      }
      return this.secondOptions.map((item) => {
        item.children = [{ value: '', label: '' }];
        return item;
      });
    },
    // 选择 一下  触发一下
    expandChange(val) {
      if (val.length == 2) {
        const list = this.getOptions[0]['children'];
        for (let i = 0; i < list.length; i++) {
          for (let j = 0; j < list[i]['children'].length; j++) {
            list[i]['children'][j]['value'] = '';
            list[i]['children'][j]['label'] = '';
          }
        }
        this.content = '';
      }
    },
    casChange(val) {
      this.$emit('input', {
        condition: this.cascarderVal[1],
        num: this.content,
      });
      this.$refs.refHandle.dropDownVisible = true; //监听值发生变化就关闭它
    },
    blur() {
      const list = this.getOptions[0]['children'];
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i]['children'].length; j++) {
          list[i]['children'][j]['value'] = this.content;
          list[i]['children'][j]['label'] = this.content;
        }
      }
      this.cascarderVal[this.cascarderVal.length - 1] = this.content;
      this.compkey = this.guid();
      this.$emit('input', {
        condition: this.cascarderVal[1],
        num: this.content,
      });
    },
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
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
.custom-cas i {
  color: #fff;
}
::v-deep .ipt.el-input input {
  height: 32px;
}
::v-deep .el-input__suffix {
  margin-top: -2px;
}
</style>