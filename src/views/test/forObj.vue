<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2023-10-16 16:22:39
 * @FilePath: /vue-shelf/src/views/test/forObj.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023-10-16 17:22:37
-->
<template>
  <div class="">
    <button @click="add('dlj')">新增</button>
    <button @click="add('ljx')">新增</button>
    <div v-for="(val, key) in detail" :key="key">
      <div>{{ key }}</div>
      <!-- {{ val }} -->
      <div v-for="item in val.chatDetial" :key="item.chatId">
        {{ item.message }}
        <br />
      </div>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "", // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      userMap: {
        dlj: {
          bindPhone: null,
          companyId: 11179,
          companyName: "北京易聊科技有限公司1101",
          departmentId: 37254,
          headUrl: "",
          userId: "group-dlj",
          userName: "group-dlj-inner"
        },
        ljx: {
          bindPhone: null,
          companyId: 11179,
          companyName: "北京易聊科技有限公司1101",
          departmentId: 37254,
          headUrl: "",
          userId: "group-ljx",
          userName: "group-ljx-inner"
        }
      },

      visitorList: {
        // 访客列表 与后台返回数据进行 覆盖合并 字段内容会发生变化 key不会变, value会变
        ljx: [
          {
            chatId: "523895357281754112",
            visitorName: "中国5751565757",
            highlightVisitorName: "中国5751565757",
            messageContent: "对话已超时, 系统关闭对话, 对话已结束",
            msgType: 20,
            unReadNum: 0,
            createTime: 1697443986692,
            hasPhone: 0,
            channel: null,
            frequent: 0,
            serverType: 0,
            visitorNum: 8,
            serverNum: 3,
            visitorId: "01000000011179744102521798893899",
            mark: 0,
            top: 0,
            robotTakeover: 0,
            robotIntervene: 1,
            robotType: 0,
            visitorLoginWay: "pc",
            visitorStaticId: "01000000011179692127312499278447",
            lastMessageTime: 1697445357790,
            closeType: 4,
            closeTime: 1697445357790,
            visitorHeadUrl: null,
            searchEngineId: 0,
            buildTalkEvent: null
          }
        ],
        dlj: [
          {
            chatId: "523895357281754112",
            visitorName: "中国5751565757",
            highlightVisitorName: "中国5751565757",
            messageContent: "对话已超时, 系统关闭对话, 对话已结束",
            msgType: 20,
            unReadNum: 0,
            createTime: 1697443986692,
            hasPhone: 0,
            channel: null,
            frequent: 0,
            serverType: 0,
            visitorNum: 8,
            serverNum: 3,
            visitorId: "01000000011179744102521798893899",
            mark: 0,
            top: 0,
            robotTakeover: 0,
            robotIntervene: 1,
            robotType: 0,
            visitorLoginWay: "pc",
            visitorStaticId: "01000000011179692127312499278447",
            lastMessageTime: 1697445357790,
            closeType: 4,
            closeTime: 1697445357790,
            visitorHeadUrl: null,
            searchEngineId: 0,
            buildTalkEvent: null
          }
        ]
      },

      // 对话详情 与后台返回数据进行 首尾合并
      recordMap: {
        "523895357281754112": [
          {
            recorderId: 1697442108369,
            chatId: "523884435536436224",
            companyId: 11179,
            createTime: 1697441382761,
            message: "成功建立对话",
            fromId: "01000000011179692127312499278447",
            type: "EVENT_ACCEPT",
            senderType: 0,
            questionId: -1,
            robot: 0,
            closeType: 0,
            createTimeStr: "15:29",
            exts: {}
          },
          {
            recorderId: 523885474826232832,
            chatId: "523884435536436224",
            companyId: 11179,
            createTime: 1697441630554,
            message: "ads",
            fromId: "01000000011179744102521798893899",
            type: "RECORD_RECORD",
            senderType: 1,
            questionId: -1,
            robot: 0,
            closeType: 0,
            createTimeStr: null,
            exts: {}
          }
        ],
        
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
  created() {
    // .$emit
  },
  beforeMount() {},
  mounted() {},
  methods: {
    add(userId) {
      this.detail[userId].chatDetial.push({
        recorderId: 523885474826232832,
        chatId: "523884435536436224",
        companyId: 11179,
        createTime: 1697441630554,
        message: Math.random(),
        fromId: "01000000011179744102521798893899",
        type: "RECORD_RECORD",
        senderType: 1,
        questionId: -1,
        robot: 0,
        closeType: 0,
        createTimeStr: null,
        exts: {}
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
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
