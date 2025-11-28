<template>
  <div style="width: 100%;height: 100%">
    <div class="flex" style="display: flex">
      <div style="margin-right: 20px" v-for="item in Object.keys(sourceMap)" @click="routerCode = item">{{item}}</div>
    </div>

    <div class="iframe-container" style="width:100%;height:100%" v-loading="loading">
      <div v-for="(src, key) in keyList" :key="key" v-show="key === routerCode" style="width:100%;height:100%">
        <iframe :id="`myIframe-${key}`" :src="src" frameborder="0" style="width:100%;height:100%;" @load="onIframeLoad(key)" width="100%" height="100%"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import {sourceList, ai6Menus} from "./iframeSourceList";

console.log("sourceList", sourceList)
export default {
  name: "IframeList",
  props: {
    code: {type: String, default: ""},
  },
  data() {
    return {
      keyList: {},
      routerCode: "",
      loading: false,
      sourceMap: sourceList.reduce((acc, item) => {
        acc[item.params] = item.source;
        return acc;
      }, {}), // 优化查找
    };
  },
  computed: {
    webcallOnlineMenus: () => ai6Menus
  },
  watch: {
    routerCode: {
      handler(newVal) {
        this.updateKeyList(newVal);
      },
      immediate: true,
    },
    "$route.params.id": {
      handler(newVal) {
        this.updateKeyList(newVal);
      },
      immediate: true,
    },
  },
  created() {
  },
  methods: {
    updateKeyList(id) {
      if (!id) return;
      if (!this.keyList[id]) {
        this.$set(this.keyList, id, this.sourceMap[id] || "");
        this.loading = true;
      }
    },
    onIframeLoad(key) {
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.iframe-container {
  width: 100%;
  height: 100%;
}
</style>
