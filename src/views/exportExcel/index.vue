<!--
 * @Description:
 * @Author: 李大玄
 * @Date: 2023/8/17 3:03 PM
 * @FilePath: src/views/exportExcel/index.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023/8/17 3:03 PM
-->
<template>
  <div class="pages">1
    <br>
    <br>
    <br>
    <el-button @click="saveFile">右上角操作增加按钮</el-button>
    <el-button @click="getSystem">获取手机信息</el-button>
                     {{ text }}
    <div v-for="item in 50">
      发表回复v那就就发货v噶额uv ---{{ item }}--
    </div>
    <el-input type="text" v-model="text" />
  </div>
</template>

<script>
import Data from './Blob';
import _ from 'lodash';
import PlatToPostMessage from './postMessage';
import uni from '@/utils/webview.1.5.4.js';
import {QWebChannel} from './qwebchannel';


export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  computed: {},
  data() {
    return {text: ''};
  },
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
    window['getPd'] = (val) => {
      console.log(1123)
      this.getPd(val);
    }
  },
  beforeMount() {
  },
  async mounted() {
    // console.log(window.opener.setNavbarList)
    // console.log(window.parent['setNavbarList'])
    // window['functionName'] = (event) => {
    //   console.log('子页面', event)
    // }
    // window.addEventListener('message', function (event) {
    //   console.log('子页面', event.data)
    // })
    // const res1 = await PlatToPostMessage.targetParent({
    //   id: 367554,
    //   fnName: 'getSystemInfo',
    // })
    // console.log('子页面', res1)
    // const res2 = await PlatToPostMessage.targetParent({
    //   id: 123,
    //   msg:"需要传递的参数",
    //   fnName: 'setNavbarList',
    //   data: [{name: '子页面操作按钮'}],
    // })
    // console.log('子页面', res2);
    // const res3 = await PlatToPostMessage.targetParent({
    //   id: 123,
    //   msg:"需要传递的参数",
    //   fnName: 'getSystemInfo',
    //   data: [{name: '啊啊大概'}],
    // })
    // console.log(res3)
    // document.addEventListener('UniAppJSBridgeReady', function() {
    //   if(path == '/pages/index/index') {
    //     uni.postMessage({ data:{code} })
    //     uni.switchTab({
    //       url: path,
    //     });
    //   } else {
    //     uni.redirectTo({
    //       url: path + '?code=' + code
    //     });
    //   }
    // });

    try {
      if (qt && qt.webChannelTransport) {
        new QWebChannel(qt.webChannelTransport, function(channel) {
          let chatHistory = channel.objects.chatHistory;
          chatHistory.IsLoadFinished();
          // console.log('chatHistory.IsLoadFinished() ---------- ');
        });
      }
    } catch(error) {
      // console.log('chatHistory.error() ---------- ');
    }
  },
  methods: {
    getPd(val) {
      console.log(JSON.stringify(val));
      console.log(val.name)
      alert(val.name);
      // console.log(val.name ? JSON.parse(val).name : JSON.parse(val).name, 22);
    },
    async saveFile() {
      const res = await PlatToPostMessage.targetParent({
        id: 1267897893,
        msg: "需要传递的参数",
        fnName: 'setNavbarList',
        data: [{name: '子页面操作按钮'}],
      })
      // console.log('子页面', res)
    },
    async getSystem() {
      const res = await PlatToPostMessage.targetParent({
        id: 'asdfrh',
        msg: "需要传递的参数",
        pFnName: 'getSystemInfo',
        data: [{name: '子页面操作按钮'}],
      }, '*')
      console.log(res);
    },
    asd() {
      document.addEventListener('UniAppJSBridgeReady', function () {
        uni.postMessage({
          data: {
            action: 'message'
          }
        });
        uni.getEnv(function (res) {
          console.log('当前环境：' + JSON.stringify(res));
        });

        document.querySelector('.btn-list').addEventListener('click', function (evt) {
          var target = evt.target;
          if (target.tagName === 'BUTTON') {
            var action = target.getAttribute('data-action');
            switch (action) {
              case 'switchTab':
                uni.switchTab({
                  url: '/pages/tabBar/API/API'
                });
                break;
              case 'reLaunch':
                uni.reLaunch({
                  url: '/pages/tabBar/component/component'
                });
                break;
              case 'navigateBack':
                uni.navigateBack({
                  delta: 1
                });
                break;
              default:
                uni[action]({
                  url: '/pages/component/button/button'
                });
                break;
            }
          }
        });
        document.getElementById('postMessage').addEventListener('click', function () {
          uni.postMessage({
            data: {
              action: 'message'
            }
          });
        });
      });
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
  }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.pages {
  //background: pink;
  overflow-y: auto;
}
</style>