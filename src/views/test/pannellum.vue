<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-01-25 16:52:20
 * @FilePath: /vue-shelf/src/views/test/pannellum.vue
-->
<template>
  <div class="hmax box">
    <!-- <v-pannellum :src="equirectangularUrl" style="height: 500px"></v-pannellum> -->
    <div id="vrBox"></div>
    <div id="controls" class="flex controls">
      <div class="item" @click="vr.setPitch(vr.getPitch() + 10)">&#9650;</div>
      <div class="item" @click="vr.setPitch(vr.getPitch() - 10)">&#9660;</div>
      <div class="item" @click="vr.setYaw(vr.getYaw() - 10)">&#9664;</div>
      <div class="item" @click="vr.setYaw(vr.getYaw() + 10)">&#9654;</div>
      <div class="item" @click="vr.setHfov(vr.getHfov() - 10)">&plus;</div>
      <div class="item" @click="vr.setHfov(vr.getHfov() + 10)">&minus;</div>
      <div class="item" @click="vr.toggleFullscreen()">&#x2922;</div>
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import VuePannellum from 'vue-pannellum';
import aaaaaa from '../../assets/images/1.jpg';
import bbbbb from '../../assets/images/2.jpg';
import cccc from '../../assets/images/3.jpeg';
import dddddd from '../../assets/images/0.jpg';
export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    VuePannellum
  },
  props: {},
  data() {
    return {
      vr: null
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
  mounted() {
    // this.init()
    this.vr = pannellum.viewer('vrBox', {
      //在default属性中,设置共有的属性、初始全景图、切换持续(虚化)时间等
      //初始全景图通过: “firstScene”: “circle” 设置 （初次进入的场景）
      // 持续时间(虚化)通过: “sceneFadeDuration”: 3000 设置,单位为毫秒
      default: {
        firstScene: 'damen',
        author: 'xxx',
        // 设置切换持续时间
        sceneFadeDuration: 1000,
        autoLoad: true
      },

      scenes: {
        damen: {
          title: '大门',
          hfov: 150,
          pitch: 2,
          yaw: 360,
          type: 'equirectangular',
          panorama: dddddd,

          //hotSpots 以全景为坐标系的固定点，可以设置链接跳转和点击事件，也可以跳转到不同的场景，该属性的值为对象，该对象有几个常用的配置项：
          hotSpots: [
            {
              // pitch、yaw、roll 定位参数
              pitch: -20,
              yaw: -360,
              type: 'scene', // 切换热点类型
              text: '前台', // 显示的文本内容
              sceneId: 'qiantai' // 切换到的下一个场景,当"type" = "scene"时使用
            }
          ]
        },

        qiantai: {
          title: '前台',
          hfov: 110,
          yaw: 5,
          type: 'equirectangular',
          panorama: aaaaaa,
          hotSpots: [
            {
              hfov: 150,
              pitch: -6,
              yaw: 360,
              type: 'scene',
              text: '拐角',
              sceneId: 'guaijiao',
              targetYaw: 360, // 返回的图片旋转角度
              targetPitch: 2 // 返回的图片旋转角度
            },
            {
              hfov: 150,
              pitch: -20,
              yaw: 100,
              type: 'scene',
              text: '大门',
              sceneId: 'damen',
              targetYaw: 360, // 返回的图片旋转角度
              targetPitch: 2 // 返回的图片旋转角度
            }
          ]
        },

        guaijiao: {
          title: '拐角',
          hfov: 150,
          pitch: 2,
          yaw: 360,
          type: 'equirectangular',
          panorama: '../../assets/img/connect/nodata.png',

          hotSpots: [
            {
              pitch: -20,
              yaw: -360,
              type: 'scene', // 切换热点类型
              text: '办公区', // 显示的文本内容
              sceneId: 'bangonqu' // 切换到的下一个场景,当"type" = "scene"时使用
            },
            {
              pitch: -6,
              yaw: -450,
              type: 'scene', // 切换热点类型
              text: '前台', // 显示的文本内容
              sceneId: 'qiantai' // 切换到的下一个场景,当"type" = "scene"时使用
            },
            {
              pitch: -20,
              yaw: -300,
              type: 'scene', // 切换热点类型
              text: '会议室', // 显示的文本内容
              sceneId: 'huiyishi' // 切换到的下一个场景,当"type" = "scene"时使用
            }
          ]
        },

        bangonqu: {
          title: '办公区',
          hfov: 150,
          pitch: 2,
          yaw: 360,
          type: 'equirectangular',
          panorama: '../../assets/img/connect/nodata.png',

          hotSpots: [
            {
              pitch: -10,
              yaw: -200,
              type: 'scene', // 切换热点类型
              text: '拐角', // 显示的文本内容
              sceneId: 'guaijiao' // 切换到的下一个场景,当"type" = "scene"时使用
            },
            {
              pitch: -10,
              yaw: -400,
              type: 'scene', // 切换热点类型
              text: '招待间', // 显示的文本内容
              sceneId: 'zhaodaijian' // 切换到的下一个场景,当"type" = "scene"时使用
            },
            {
              pitch: 1,
              yaw: -337,
              type: 'scene', // 切换热点类型
              text: '窗户', // 显示的文本内容
              sceneId: 'chuanghu' // 切换到的下一个场景,当"type" = "scene"时使用
            },
            {
              pitch: -5,
              yaw: -440,
              type: 'scene', // 切换热点类型
              text: '销售部', // 显示的文本内容
              sceneId: 'xiaoshoubu' // 切换到的下一个场景,当"type" = "scene"时使用
            }
          ]
        },

        huiyishi: {
          title: '会议室',
          hfov: 150,
          pitch: 2,
          yaw: 360,
          type: 'equirectangular',
          panorama: '../../assets/img/connect/nodata.png',

          hotSpots: [
            {
              // pitch、yaw、roll 定位参数
              pitch: -20,
              yaw: -260,
              type: 'scene', // 切换热点类型
              text: '拐角', // 显示的文本内容
              sceneId: 'guaijiao' // 切换到的下一个场景,当"type" = "scene"时使用
            }
          ]
        },

        xiaoshoubu: {
          title: '销售部',
          hfov: 150,
          pitch: 2,
          yaw: 360,
          type: 'equirectangular',
          panorama: '../../assets/img/connect/nodata.png',

          hotSpots: [
            {
              // pitch、yaw、roll 定位参数
              pitch: -10,
              yaw: -80,
              type: 'scene', // 切换热点类型
              text: '办公区', // 显示的文本内容
              sceneId: 'bangonqu' // 切换到的下一个场景,当"type" = "scene"时使用
            }
          ]
        },

        chuanghu: {
          title: '窗户',
          hfov: 150,
          pitch: 2,
          yaw: 360,
          type: 'equirectangular',
          panorama: '../../assets/img/connect/nodata.png',

          hotSpots: [
            {
              // pitch、yaw、roll 定位参数
              pitch: -20,
              yaw: -170,
              type: 'scene', // 切换热点类型
              text: '办公区', // 显示的文本内容
              sceneId: 'bangonqu' // 切换到的下一个场景,当"type" = "scene"时使用
            }
          ]
        },

        zhaodaijian: {
          title: '招待间',
          hfov: 150,
          pitch: 2,
          yaw: 360,
          type: 'equirectangular',
          panorama: '../../assets/img/connect/nodata.png',

          hotSpots: [
            {
              // pitch、yaw、roll 定位参数
              pitch: -20,
              yaw: -190,
              type: 'scene', // 切换热点类型
              text: '办公区', // 显示的文本内容
              sceneId: 'bangonqu' // 切换到的下一个场景,当"type" = "scene"时使用
            }
          ]
        }
      }
    });
  },

  methods: {
    init() {
      this.vr = pannellum.viewer('vrBox', {
        type: 'equirectangular', // 全景展示图片方式（基本全景图配置）
        //"panorama": "img/27f75e791e1c7f88a1419e92429bd9e0.jpg", // 全景展示图片的资源
        panorama: 'img/vr.jpg', // 全景展示图片的资源
        // "autoLoad": true, // 自动播放全景图
        // "autoRotateInactivityDelay":2000,// 点击屏幕后，两秒没有交互的话继续旋转
        // "autoRotate": -20,// 每秒顺时针旋转两度
        preview: 'img/27f75e791e1c7f88a1419e92429bd9e0.jpg', // 未点击进入全景预览前的展示图片
        title: '武汉知会', // 左下角会出现标题
        author: 'xxx', // 左下角会出现作者名字
        compass: true, // 添加指南针

        // 在3d视角内以屏幕的方式展示图片，类似于vr影院中的电影屏幕
        // "haov": 160.87, //初始化水平
        // "vaov": 54.15, // 垂直视角。
        // "vOffset": 1.17, //初始垂直偏移角
        // 随着haov不断减小，相当于图片被不断压缩(如果图片可以再长一点，应该会更明显)，一屏所能展示的内容不断增多；
        // 随着haov不断增大，相当于图片被不断拉伸，一屏所能展示的内容不断减少。
        // voac是同理的，是不过改成了垂直方向。
        // vOffset：屏幕展示的形状，值越大越像个扇子
        // "hotSpotDebug": true,
        hotSpots: [
          {
            pitch: 14.1, // X轴（左耳到右耳）旋转（正数往上，负数往下）
            yaw: 1.5, // y轴（从脚到头）旋转
            type: 'info', // 热点类型
            text: '天花板' // 划入文字
            //"URL": "https://www.baidu.com" // 点击跳转
          },
          {
            pitch: -9.4,
            yaw: 222.6,
            type: 'info',
            text: '椅子'
          },
          {
            pitch: -0.9,
            yaw: 144.4,
            type: 'info',
            text: '天空'
          }
        ]
        // pitch是围绕X轴旋转
        // yaw是围绕Y轴旋转
        // roll是围绕Z轴旋转（从眼睛到后脑勺）
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
.box {
  position: relative;
}
.controls {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  background: #ccc;
  .item {
    margin-left: 20px;
    padding: 10px;
    cursor: pointer;
  }
}
</style>