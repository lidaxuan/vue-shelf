<!--
 * @Description: 
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-03-29 11:00:24
 * @FilePath: /vue-shelf/src/App.vue
-->
<template>
  <div id="app-base">
    <el-menu default-active="/" :router="true" mode="horizontal">
      <!--基座中可以放自己的路由-->
      <el-menu-item index="/">Home</el-menu-item>
      <!--引用其他子应用-->
      <el-menu-item index="/configWorkType">configWorkType</el-menu-item>
      <el-menu-item index="/versionDataConfig">versionDataConfig</el-menu-item>
      <el-menu-item index="/home">home</el-menu-item>
      <el-menu-item index="/about">about</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#app-base {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
