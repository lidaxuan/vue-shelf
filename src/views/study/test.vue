<!--
 * @Description: JavaScript忍者秘籍
 * @Author: 李大玄
 * @Date: 2023-01-07 09:19:27
 * @FilePath: /vue-shelf/src/views/study/test.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023-02-11 18:03:46
-->
<template>
  <div class="">
    1
    李大玄
    {{ isPalindrome("abcdefg") }}
  </div>
</template>

<script>
export default {
  name: "", // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {
    // temObj: {
    //   handler(newVal, oldVal) {},
    //   deep: true, // 深度
    //   immediate: true, // 立即执行
    // },
  },
  beforeCreate() {
  },
  created() {
    console.log('李继玄', '李继玄')
    // .$emit
    var arr = [];
    for (let i = 0; i <= 100; i++) {
      arr.push(i);
    }
    console.log(JSON.stringify(arr));
    // console.log(JSON.stringify(arr.reverse()));
    var ninja = {
      chirp: function (params) {
        return 1;
      }
    };
    var samurai = {
      chirp: ninja.chirp
    };
    ninja = {};

    var ninja = {};
    this.addMethod(ninja, "whatever", function () {
      /* do something */
      console.log(1);
    });
    this.addMethod(ninja, "whatever", function (a) {
      console.log(2);
      /* do something else */
    });
    this.addMethod(ninja, "whatever", function (a, b) {
      console.log(3);
      /* yet something else */
    });
    console.log("ninja", ninja);
    this.asdasd()
  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    isPalindrome(text) {
      if (text.length <= 1) {
        return true;
      }
      if (text.charAt(0) != text.charAt(text.length - 1)) {
        return false;
      }

      return isPalindrome(text.substr(1, text.length - 2));
    },
    async asdasd(data) {
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          if (data) {
            resolve(true)
          } else {
            reject(throw Error('这是个错误函数'))

          }
        }, 500)
      })
    },
    /** 缓存函数实现
     * @param {*} value
     ■在函数调用 获取之前计算结果的时候，最终用户享有性能优势。
     ■发生在幕后， 完全无缝，最终用户和页面开发人员都无需任何特殊操作或为此做任何额外的初始化工作。但是，这种方式并不完全都是鲜花和掌声，与优点相比，也需要权衡-下缺点。
     ■为了提高性能，任何类型的缓存肯定会牺牲掉内存。
     ■纯粹主义者可能认为缓存这个问题不应该与业 务逻辑放在一起，一个函数或方法应该只做一件事，并把它做好。
     ■很难测试或测量- 一个算法的性能，就像本例这样。
     */
    isPrime(value) {
      if (!this.isPrime.answers) {
        this.isPrime.answers = {};
      }
      if (this.isPrime.answers[value] != null) {
        console.log(111);
        console.log(this.isPrime.answers);
        return this.isPrime.answers[value];
      }
      var prime = value != 1;
      for (let i = 2; i < value; i++) {
        if (value % i == 0) {
          prime = false;
          break;
        }
      }
      console.log(2222);
      return (this.isPrime.answers[value] = prime);
    },
    addMethod(object, name, fn) {
      var old = object[name];
      object[name] = function () {
        console.log("arguments.length", arguments.length);
        if (fn.length == arguments.length) {
          return fn.apply(this, arguments);
        } else if (typeof old == "function") {
          return old.apply(this, arguments);
        }
      };
    }
  },
  beforeUpdate() {
  }, //生命周期 - 更新之前
  updated() {
  }, //生命周期 - 更新之后
  beforeDestroy() {
  }, //生命周期 - 销毁之前
  destroyed() {
  }, //生命周期 - 销毁完成
  activated() {
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
