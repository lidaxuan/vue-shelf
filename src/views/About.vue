<template lang="pug">
  <div class="about">
    <template>
      ul
        li(class='mt10') 11
    </template>
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import _ from "lodash";
// import { getMediaList } from "@/model/flowNode";
export default {
  data() {
    return {
      list: [1,2,34,4],
      str: void 0,
      ddd: "2021-3-30 18:27",
    };
  },
  created() {
    this.gettime();
    _.map(this.list, item => {
      item + 1;
      // console.log(item);
    });
    this.ad();
  },
  methods: {
    gettime() {
      const data = new Date();
      const y = data.getFullYear();
      const mm = data.getMonth()+1;
      const d = data.getDate();
      const h = data.getHours();
      const m = data.getMinutes();
      this.str = y + '-' + mm +"-" + d+ " " + h + ":" +m;
    },
    async ad() {
      let time = setInterval(() => {
        this.gettime();
        console.log(this.str <= this.ddd);
        if (this.str < this.ddd) {
          console.log(1);
        } else {
          clearInterval(time);
          time = null;
          console.log("系统使用时间到了,");
        }
      }, 1000);
      // const a = await getMediaList();
      // console.log(a);
    }
  }
};
</script>
