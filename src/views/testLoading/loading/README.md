普通情况下 使用 loading 是这样的

```js
<template>
  <div class="" v-loading="loading"></div>
</template>

<script>


export default {
  data() {
    return {
      loading: false
    };
  },
  beforeMount() {},
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },

};
</script>
```
