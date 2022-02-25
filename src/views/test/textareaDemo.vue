<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-01-13 18:37:01
 * @FilePath: /vue-shelf/src/views/test/textareaDemo.vue
-->
<template>
  <div class="demo">
    <div class="wmax flex flex-aic flex-ccc">
      <ul class="mt50">
        <li class="h30 mb10" style="background: pink" v-for="item in list" :key="item.id" v-rightKey="{ menuList, clickclick, data: item }">
          <div>{{ item.name }}1</div>
        </li>
      </ul>
    </div>
    <button v-rightKey="{ menuList: menuList2 }">子菜单</button>
  </div>
</template>

<script>
import uuid from 'uuid';
let arr = [];
for (let i = 0; i < 10; i++) {
  arr.push({ name: `比如说啥都你好色${uuid()}`, id: uuid() });
}
export default {
  name: '',
  components: {},
  computed: {},
  data() {
    return {
      list: arr,
      menuList: [
        { text: '菜单1' },
        { text: 's' },
        { text: '菜单1' },
        { text: '菜单2' },
        { text: '菜单1' },
        { text: '菜单2' },
        { text: '菜单菜单' },
        { text: '菜单2' }
      ],
      menuList2: [{ text: 'asdadsad阿达' }, { text: '阿萨达全微分我个人' }]
    };
  },
  mounted() {},
  methods: {
    clickclick(e, a) {
      console.log(e, a);
    }
  }
};
</script>
<style lang="scss" scoped>
.demo {
  position: relative;
  width: 100%;
  height: 200%;
  background: rgb(205, 230, 198);
}
.box {
  width: 100px;
  height: 200px;

  position: absolute;
}
</style>
