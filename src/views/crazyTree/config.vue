<template>
  <div class="">
    <div class="dialog" v-if="visibleConfig">
      <div class="close" @click="closeConfig">X</div>
      <div class="content">
        <div class="item" style="margin-bottom: 20px">
          <span class="text">音乐</span>
          <el-switch v-model="isMusic" @change="e => configChange('isMusic', e)" active-color="#13ce66" inactive-color="#463E3E"></el-switch>
        </div>
        <div class="item">
          <span class="text">音效</span>
          <el-switch v-model="isSoundEffects" @change="e => configChange('isSoundEffects', e)" active-color="#13ce66" inactive-color="#463E3E"></el-switch>
        </div>
        <div class="item" v-if="!visibleBack">
          <el-button size="lang" type="primary" class="back" @click="backPage">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: '',  // Pascal命名
  mixins: [],
  components: {},
  props: {
    visibleBack: {
      type: Boolean,
      default: () => false
    }
  },
  //import引入的组件需要注入到对象中才能使用
  //这里存放数据
  data() {
    return {
      visibleConfig: false,
      isMusic: true,
      isSoundEffects: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {
  }, //生命周期 - 创建之前
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {
  }, //生命周期 - 挂载之前
  mounted() {
  },
  //方法集合
  methods: {
    open() {
      const localIsMusic = JSON.parse(localStorage.getItem("isMusic"));
      const localIsSoundEffects = JSON.parse(localStorage.getItem("isSoundEffects"));
      if (localIsMusic === null && localIsSoundEffects === null) {
        localStorage.setItem("isMusic", JSON.stringify(true));
        localStorage.setItem("isSoundEffects", true);
      } else {
        this.isMusic = localIsMusic;
        this.isSoundEffects = localIsSoundEffects;
      }
      this.visibleConfig = true;
    },
    closeConfig() {
      this.visibleConfig = false;
      this.$emit("closeConfig");
    },
    configChange(key, val) {
      localStorage.setItem(key, val);
      this.$emit("configChange", key, val);
    },
    backPage() {
      this.visibleConfig = false;
      this.$emit("backPage");
    }
  }
}
</script>
<style lang='scss' scoped>
.dialog {
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 50%;
  //height: 200px;
  background: #fff;
  border: 4px solid #000;
  border-radius: 10px;
  background-size: 100%;
  padding: 20px 20px;
  .close {
    position: absolute;
    right: -15px;
    top: -15px;
    font-size: 16px;
    background: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #000;
  }

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        font-size: 20px;
        margin-right: 20px;
      }

      .back {
        width: 100%;
        font-size: 20px;
      }
    }
  }
}

</style>
