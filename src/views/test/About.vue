<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-03-29 11:00:24
 * @FilePath: /vue-shelf/src/views/test/About.vue
-->
<template>
  <div class="about">
    <!-- //- <template>
    //-   ul
    //-     li(class='mt10') 11
    //- </template>
    //- <h1>This is an about page</h1>
    
    include ./test.pug
    +test(true)

    include ./test.pug
    +test(false) -->
  </div>
</template>
<script>
import _ from "lodash";
// import { getMediaList } from "@/model/flowNode";
export default {
  data() {
    return {
      list: [1, 2, 34, 4],
      str: void 0,
      ddd: "2021-3-30 18:27",
      testVal: "2021-3-30 18:27",
      aaa: { disabled: true },
      bbb: { disabled: false }
    };
  },
  created() {
    this.gettime();
    _.map(this.list, (item) => {
      item + 1;
      // console.log(item);
    });
    // this.ad();

    var lengthOfLongestSubstring = function (s) {
      let length = 0;
      const sList = s.split("");
      if (sList.length <= 1) {
        return sList.length;
      }
      let start = 0;
      let end = 0;
      let map = new Map();

      while (end < sList.length) {
        let index = map.get(sList[end]);
        console.log(index);
        // map中有值
        if (index) {
          start = Math.max(index, start);
        }
        length = Math.max(length, end - start + 1);
        map.set(sList[end], end + 1);
        end++;
      }
      return length;
    };
    console.log("lengthOfLongestSubstring", lengthOfLongestSubstring("asdasdasdddd"));
  },
  methods: {
    gettime() {
      const data = new Date();
      const y = data.getFullYear();
      const mm = data.getMonth() + 1;
      const d = data.getDate();
      const h = data.getHours();
      const m = data.getMinutes();
      this.str = y + "-" + mm + "-" + d + " " + h + ":" + m;
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
