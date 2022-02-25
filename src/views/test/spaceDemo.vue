<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-01-07 10:43:52
 * @FilePath: /vue-shelf/src/views/test/spaceDemo.vue
-->
<template>
  <div class="flex flex-ccc flex-column flex-aic mt30">
    <div>
      <el-radio-group v-model="align">
        <el-radio label="start">start</el-radio>
        <el-radio label="end">end</el-radio>
        <el-radio label="center">center</el-radio>
        <el-radio label="baseline">baseline</el-radio>
      </el-radio-group>
      <br />
      <el-radio-group v-model="direction">
        <el-radio label="vertical">vertical</el-radio>
        <el-radio label="horizontal">horizontal</el-radio>
      </el-radio-group>
      <br />
      <el-radio-group v-model="wrap">
        <el-radio :label="false">false</el-radio>
        <el-radio :label="true">true</el-radio>
      </el-radio-group>
      <br />
      <el-radio-group v-model="size">
        <el-radio label="small">small</el-radio>
        <el-radio label="middle">middle</el-radio>
        <el-radio label="large">large</el-radio>
      </el-radio-group>
      <br />
      <!-- <el-slider v-model="size"></el-slider> -->
      <br />
      <el-input v-model="split"></el-input>
    </div>

    <br />
    <br />
    <br />
    <Space :align="align" :direction="direction" :size="size" :split="split" :wrap="wrap">
      <el-button  type="primary">第一个</el-button>
      <el-button type="text">第一个</el-button>
      <el-button type="text">第一个</el-button>
      <el-button type="text">第一个</el-button>
      <div v-for="item in 20" :key="item" style="background: pink">续航达1008公里！全球</div>
      <span style="background: red" >sadasd</span>
    </Space>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import Space from '@/components/space/index.vue';

export default {
  components: {
    Space,
  },
  data() {
    return {
      align: 'center',
      direction: 'horizontal',
      size: 'small',
      split: '|',
      wrap: false,
    };
  },
};
</script>