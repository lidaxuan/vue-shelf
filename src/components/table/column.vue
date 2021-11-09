<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-09-18 11:48:05
 * @FilePath: /vue-shelf/src/components/table/column.vue
-->
<template>
  <div>
    <el-table-column v-for="(item, index) in list" :key="index" v-bind="item">
      <column v-if="item.children && item.children.length" :list="item.children">
        <slot/>
      </column>
    </el-table-column>
  </div>
</template>

<script>
export default {
  name: 'column',
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>
