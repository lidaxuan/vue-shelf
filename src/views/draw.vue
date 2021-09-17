<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-09-03 18:18:08
 * @FilePath: /vue-shelf/src/views/draw.vue
-->
<template>
  <div>
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px"> 点我打开 </el-button>

    <CustomDrawer title="我是外面的 Drawer" v-if="drawer" :visible.sync="drawer" size="50%">
      <template #content>
        <div>
          <el-button @click="innerDrawer = true">打开里面的!</el-button>
          <CustomDrawer title="我是里面的" :append-to-body="true" :visible.sync="innerDrawer" v-if="innerDrawer">
            <template #content>
              <p>_(:зゝ∠)_</p>
            </template>
          </CustomDrawer>
        </div>
      </template>
    </CustomDrawer>
  </div>
</template>
<script>
import CustomDrawer from '@/components/customDrawer';

export default {
  data() {
    return {
      drawer: false,
      innerDrawer: false,
    };
  },
  components: {
    CustomDrawer,
  },
  methods: {
    handleClose(done) {
      done();
    },
  },
};
</script>
