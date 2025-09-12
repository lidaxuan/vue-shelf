<!--
 * @Description:
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-03-29 11:00:24
 * @FilePath: /vue-shelf/src/views/Home.vue
-->
<template>
  <div class="">
    <el-button @click="step = 2" class="w200 h40" type="primary">去开通</el-button>
    <el-button @click="play" class="w200 h40" type="primary">播放</el-button>

    <el-button class="w200 h40" type="primary">
      <router-link :to="{ path: '/optimization' }">/optimization</router-link>
    </el-button>
    <el-button class="w200 h40" type="primary">
      <router-link :to="{ path: '/testSelect' }">/testSelect</router-link>
    </el-button>
    <el-button class="w200 h40" type="primary">
      <router-link :to="{ path: '/deconstruction' }">/{ data = [] = await xxxxx() }}</router-link>
    </el-button>
    <br>
    <a href="mailto:name@example.com"> Send Email </a>
    <br>
    <a href="tel:+1234567890"> Call Us </a>
    <br>
    <a href="sms:+1234567890"> Send SMS </a>
    <br>
    <input type="text" spellcheck="true"/>
    <a href="https://baidu.com" target="_self">Open</a>&nbsp;
    <a href="https://baidu.com" target="_blank">Open</a>
    <a href="https://baidu.com" target="_parent">Open</a>&nbsp;
    <a href="https://baidu.com" target="_top">Open</a>&nbsp;
    <a href="https://baidu.com" target="framename">Open</a>&nbsp;

    <h1>IndexedDB Demo</h1>
    <button id="add">Add User</button>
    <button id="read">Read Users</button>
    <button id="update">Update User</button>
    <button id="delete">Delete User</button>

  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  //import引入的组件需要注入到对象中才能使用
  //这里存放数据
  data() {
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {}, //生命周期 - 挂载之前
  mounted() {


      const dbName = "MyDatabase";
      let db;

      // 1. 打开数据库
      const request = indexedDB.open(dbName);

      // 2. 初始化数据库
      request.onupgradeneeded = (event) => {
      db = event.target.result;
      const store = db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
      store.createIndex("name", "name", { unique: false });
      console.log("ObjectStore created");
    };

      request.onsuccess = (event) => {
      db = event.target.result;
      console.log("Database opened successfully");
    };

      request.onerror = (event) => {
      console.error("Database error:", event.target.error);
    };

      // 3. 添加用户
      document.getElementById("add").onclick = () => {
      const transaction = db.transaction(["users"], "readwrite");
      const store = transaction.objectStore("users");
      const user = { name: "Alice", age: 25 };
      store.add(user);
      transaction.oncomplete = () => console.log("User added:", user);
    };

      // 4. 读取用户
      document.getElementById("read").onclick = () => {
      const transaction = db.transaction(["users"], "readonly");
      const store = transaction.objectStore("users");
      const request = store.getAll();
      request.onsuccess = () => console.log("All users:", request.result);
    };

      // 5. 更新用户
      document.getElementById("update").onclick = () => {
      const transaction = db.transaction(["users"], "readwrite");
      const store = transaction.objectStore("users");
      // 假设更新 id=1 的用户
      const getRequest = store.get(1);
      getRequest.onsuccess = () => {
      const user = getRequest.result;
      if (user) {
      user.age = 30;
      store.put(user);
      console.log("User updated:", user);
    }
    };
    };

      // 6. 删除用户
      document.getElementById("delete").onclick = () => {
      const transaction = db.transaction(["users"], "readwrite");
      const store = transaction.objectStore("users");
      // 假设删除 id=1 的用户
      const deleteRequest = store.delete(1);
      deleteRequest.onsuccess = () => console.log("User deleted");
    };

},
  //方法集合
  methods: {
    ready(editorInstance) {
      console.log(`编辑器实例${editorInstance.key}: `, editorInstance);
    },
    play() {
      const url = 'http://wecom-dev.oss-cn-beijing.aliyuncs.com/corpSessionMsgFile/2021/5/24/7152db1f5ea34243b4ff76fa51e62b30.amr';
      let amr = new BenzAMRRecorder();
      amr.initWithUrl(url).then(function () {
        amr.play();
      });
    },
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
