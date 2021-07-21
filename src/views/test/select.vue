<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-07-15 11:19:43
 * @FilePath: /vue-shelf/src/views/test/select.vue
-->
<template>
  <el-form-item :label="getLabel()" class="flex mr20">
    <el-select :value="value" placeholder="请选择" @input="onChange" class="w300">
      <template v-for="(item, index) in getList()">
        <el-option :key="index" :label="item.label" :value="item.value"></el-option>
      </template>
    </el-select>
  </el-form-item>
</template>

<script>
import uuid from 'uuid';
export default {
  computed: {},
  props: {
    value: {
      type: String,
    },
    label: {
      type: String | Number
    },
  },
  mounted() {
    this.$emit('input', '');
  },
  methods: {
    
    async getList() {
      const arr = [];
      for(let i = 0; i < 10; i++) {
        arr.push({
          label: `${this.getLabel()}-${i + 1}-${uuid()}`,
          value: `${this.getLabel()}-${i + 1}-${uuid()}`,
        });
      }
      return arr;
    },
    onChange (value) {
      this.$emit('input', value);
    },
    getLabel() {
      return String.fromCharCode( this.label + 64);
    }
  }
};
</script>