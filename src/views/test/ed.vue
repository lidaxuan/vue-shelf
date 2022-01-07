<!--
 * @Description: 
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-06-03 17:10:36
 * @FilePath: /vue-shelf/src/views/ed.vue
-->
<template>
  <div class="box flex">
    
    <QuillEditor style="width: 50%"
      v-model="content"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      :options="editorOption"
      ref="QuillEditor"
    ></QuillEditor>
    <Show  style="width: 50%" :content="content"></Show>
    <!-- <Upload
    :show-upload-list="false"
    :on-success="handleSuccess"
    :format="['jpg','jpeg','png','gif']"
    :max-size="2048"
    multiple
    action="/file/upload"
    >
    <Button icon="ios-cloud-upload-outline" ></Button>
</Upload> -->
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import Show from '@/components/show';
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  // ['blockquote'],

  [{ header: 1 }, { header: 2 }], // custom button values
  // [{ list: 'ordered' }, { list: 'bullet' }],
  // [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  // [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  // [{ direction: 'rtl' }], // text direction

  // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  // ['link', 'image', 'video'],
  ['image'],
  // ['clean'], // remove formatting button
];

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor as QuillEditor} from 'vue-quill-editor';
export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    QuillEditor,Show
  },
  props: {},
  //import引入的组件需要注入到对象中才能使用
  //这里存放数据
  data() {
    return {
      content: '',
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function (value) {
                if (value) {
                  // alert('自定义图片');
                  console.log(value);
                  // document.querySelector('.ivu-upload .ivu-btn').click()
                } else {
                  this.quill.format('image', false);
                }
              },
            },
          },
        },
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {}, //生命周期 - 挂载之前
  mounted() {},
  //方法集合
  methods: {
    onEditorBlur(quill) {
      console.log('editor blur!', quill);
    },
    //获得焦点事件
    onEditorFocus(quill) {
      console.log('editor focus!', quill);
    },
    // 准备富文本编辑器
    onEditorReady(quill) {
      console.log('editor ready!', quill);
    },
    //内容改变事件
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text);
      this.content = html;
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
</style>