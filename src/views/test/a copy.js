/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-12-09 18:32:37
 * @FilePath: /vue-shelf/src/views/a.js
 */
impo a frim 'asd'
export default {
  name: '', // Pascal命名ˇ
  mixins: [a],
  components: {
    customForm,
  },
  props: {},
  data() {
    return {
      model: {
        name: '',
        sex: '',
      },
      formConfig: {
        inline: !false,
        label: !false,
        clearable: true,
        formItem: [
          {
            type: 'input',
            model: 'name',
            label: '姓名',
            placeholder: '请输入姓名',
          },
          {
            type: 'input',
            model: 'name',
            label: '姓名',
            // placeholder: '请输入姓名',
          },
          {
            type: 'select',
            model: 'name',
            label: '性别',
            clearable: false,
            slotName: 'asdasd',
            // placeholder: '请输入姓名',
          },
        ],
      },
      tableObj: {
        
      }
    };
  },
  computed: {},
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
  methods: {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};