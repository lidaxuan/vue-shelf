<!--
 * @Description:
 * @Author: 李大玄
 * @Date: 2023/10/30 11:09 AM
 * @FilePath: /vue-shelf/src/views/chatList/index.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023-11-29 09:39:58
-->
<template>
  <div class="hmax">
    <!-- <iframe
      width="100%"
      height="400px"
      src="http://192.168.160.160:6785/?access_token=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiLmmJPogYrnp5HmioAiLCJpc3MiOiLmmJPogYrnp5HmioAiLCJpYXQiOjE2OTg3MTU0MzAsImV4cCI6MTcwMTMwNzQzMCwiY29tcGFueUlkIjoxNjUzNSwidXNlcklkIjoiY3Vpc2hpeWluZyIsImFwcElkIjoiNTAwMDAiLCJkZXBhcnRtZW50SWQiOjE2NjEwLCJ1c2VyS2lkIjoxODEyNzUsImdlbmVyYXRlVGltZSI6IjIwMjMtMTAtMzEgMDk6MjM6NTAiLCJqdGkiOiIzMTkyM2M1Mi1hMDI3LTQ1MzAtODZhNy04ZGI3NDVkNjg2YzkifQ.AL8dQ0NzuIX9i__qZgb0bs_U9xNPSYc-NCaUhhw3CCm9WwvUDedu8u5H5qsTJMX_iJdLDgfTAjUT72c_2vF9Ch0Y2NBbKHEowUlUDpH21VhtNx_KAK_SDOiNoTOepdKKI1i-5gNGnzoagTpFYTsnHYWc_3yLw6DFlDKwzzsNshU&refresh_token=yvsalVUYdIlnPF7zaJgg8vnTN1ntbul251tMHboo&clientFrom=webClient/#/pageMachineLearning"
    ></iframe>
    <iframe
      width="100%"
      height="400px"
      src="https://test-prd18.easyliao.net/eachbot-flow-web/index/?access_token=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiLmmJPogYrnp5HmioAiLCJpc3MiOiLmmJPogYrnp5HmioAiLCJpYXQiOjE2OTg3MTU0MzAsImV4cCI6MTcwMTMwNzQzMCwiY29tcGFueUlkIjoxNjUzNSwidXNlcklkIjoiY3Vpc2hpeWluZyIsImFwcElkIjoiNTAwMDAiLCJkZXBhcnRtZW50SWQiOjE2NjEwLCJ1c2VyS2lkIjoxODEyNzUsImdlbmVyYXRlVGltZSI6IjIwMjMtMTAtMzEgMDk6MjM6NTAiLCJqdGkiOiIzMTkyM2M1Mi1hMDI3LTQ1MzAtODZhNy04ZGI3NDVkNjg2YzkifQ.AL8dQ0NzuIX9i__qZgb0bs_U9xNPSYc-NCaUhhw3CCm9WwvUDedu8u5H5qsTJMX_iJdLDgfTAjUT72c_2vF9Ch0Y2NBbKHEowUlUDpH21VhtNx_KAK_SDOiNoTOepdKKI1i-5gNGnzoagTpFYTsnHYWc_3yLw6DFlDKwzzsNshU&refresh_token=yvsalVUYdIlnPF7zaJgg8vnTN1ntbul251tMHboo&clientFrom=webClient/#/pageKnowledgeBase"
    ></iframe>
    <iframe
      width="100%"
      height="400px"
      src="https://test-prd18.easyliao.net/eachbot-flow-web/index/?access_token=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiLmmJPogYrnp5HmioAiLCJpc3MiOiLmmJPogYrnp5HmioAiLCJpYXQiOjE2OTg3MTU0MzAsImV4cCI6MTcwMTMwNzQzMCwiY29tcGFueUlkIjoxNjUzNSwidXNlcklkIjoiY3Vpc2hpeWluZyIsImFwcElkIjoiNTAwMDAiLCJkZXBhcnRtZW50SWQiOjE2NjEwLCJ1c2VyS2lkIjoxODEyNzUsImdlbmVyYXRlVGltZSI6IjIwMjMtMTAtMzEgMDk6MjM6NTAiLCJqdGkiOiIzMTkyM2M1Mi1hMDI3LTQ1MzAtODZhNy04ZGI3NDVkNjg2YzkifQ.AL8dQ0NzuIX9i__qZgb0bs_U9xNPSYc-NCaUhhw3CCm9WwvUDedu8u5H5qsTJMX_iJdLDgfTAjUT72c_2vF9Ch0Y2NBbKHEowUlUDpH21VhtNx_KAK_SDOiNoTOepdKKI1i-5gNGnzoagTpFYTsnHYWc_3yLw6DFlDKwzzsNshU&refresh_token=yvsalVUYdIlnPF7zaJgg8vnTN1ntbul251tMHboo&clientFrom=webClient/#/pageWordSearch"
    ></iframe> -->
    <el-button @click="send">建数据</el-button>
    <br />
    <!-- <div v-for="(item, index) in chatList" :key="item.id" :style="`background: ${item.id == selectItem.id ? 'pink' : ''}`" @click="itemSelect(item, index)" class="item">
      {{ item.name }}
    </div> -->
    <!-- {{ number }} -->
  </div>
</template>

<script>
import { alwaysTime, alwaysTimeMult, alwaysHookSize } from "./alwaystime";

export default {
  name: "", // Pascal命名
  mixins: [],
  components: {},
  props: {},
  computed: {},
  data() {
    return {
      chatList: [],
      selectItem: {},
      number: 0
    };
  },
  watch: {},
  beforeCreate() {},
  async created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    send() {
      const total = Math.floor(Math.random() * 100);

      for (let i = 0; i < total; i++) {
        const num = Math.floor(Math.random() * 10000000);
        this.$HttpRobot.createChat({ c: 1, v: num, u: num, config: 54889, g: 1625393 });
        // this.$HttpRobot.createChat({ c: 1, v: num, u: num, config: 55271, g: 1626299 });
      }
      window.location.href = `http://localhost:6537/#/?${total}`;
    },

    getData() {
      let num = 1;
      for (let i = 0; i < 100000; i++) {
        num += i;
      }
      return num;
    },
    itemSelect(item, index) {
      this.selectItem = Object.assign({}, item);
    },
    async fetchList() {
      const res = await new Promise((resolve, reject) => {
        let arr = [];
        for (let i = 0; i < 50; i++) {
          arr.push({ id: Math.random(), name: "张三" + Math.random(), content: "i老板额FWIURFHRIUFBANoihieroHOKLJOH后羿" });
        }
        setTimeout(() => {
          if (true) {
            resolve({
              code: 0,
              data: arr
            });
          } else {
            // reject(throw Error('这是个错误函数'))
          }
        }, 100);
      });
      this.chatList = [].concat(this.chatList, res.data || []);
      setTimeout(() => {
        this.fetchList();
      }, 2000);
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
.item {
  padding: 10px;
  box-shadow: red;
  &.active {
  }
}
</style>
