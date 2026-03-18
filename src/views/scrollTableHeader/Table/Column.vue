<template>
  <el-table-column v-bind="$attrs">
    <template #header="scope" v-if="!isEmpty(tips)">
      {{ $attrs.label }}
      <span>
        <el-tooltip effect="dark" :content="tips" placement="top">
          <strong class="el-icon-info"/>
        </el-tooltip>
      </span>
    </template>
    <template #default="scope" v-if="isEmpty($attrs.type)">
      <template v-if="$attrs.slotName || formatter || !isEmpty(scope.row[$attrs.prop]) || !isEmpty($attrs.before) || !isEmpty($attrs.after) || !isEmpty(defaultValue) || !isEmpty(globaDefaultValue)">
        <slot :name="$attrs.slotName" v-bind="scope"  :item="$attrs" v-if="!isEmpty($attrs.slotName)"/>
        <template v-else-if="formatter">{{ formatter(scope.row, scope.column, scope.row[$attrs.prop], scope.$index) }}</template>
        <template v-else-if="!isEmpty(scope.row[$attrs.prop])">
          {{ !isEmpty($attrs.before) ? $attrs.before : '' }}
          {{ scope.row[$attrs.prop] }}
          {{ !isEmpty($attrs.after) ? $attrs.after : '' }}
        </template>
        <template v-else>{{ !isEmpty(defaultValue) ? defaultValue : (!isEmpty(globaDefaultValue) ? globaDefaultValue : '') }}</template>
      </template>
    </template>

    <template v-if="$attrs.children && $attrs.children.length > 0">
      <template v-for="(item, index) in $attrs.children">
        <ETableColumnSp :key="index" v-bind="item" :columnData="columnData" :globaDefaultValue="globaDefaultValue"
                        v-if="item.display === undefined || item.display === true"
        >
          <template #[slotName]="scope" v-for="slotName in fotmatSlotNames($attrs.children)">
            <slot :name="slotName" v-bind="scope" :item="item"/>
          </template>
        </ETableColumnSp>
      </template>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "ETableColumnSp",
  // provide() {
  //   return {
  //     containerType: 'text-primary',
  //   };
  // },
  inheritAttrs: false,
  props: {
    columnData: {
      type: Array,
      default: (_) => [],
    },
    defaultValue: null,
    tips: null,
    globaDefaultValue: null,
    formatter: {
      type: Function,
    }
  },
  mounted() {
  },
  methods: {
    isEmpty(val) {
      return val === null || val === undefined || val === "";
    },
    fotmatSlotNames(arr) {
      let newArr = [];
      arr.forEach((item) => {
        if (item.slotName) {
          newArr.push(item.slotName);
        }
        let children = item.children;
        if (children && children.length === 0) {
          newArr = [...newArr, ...this.fotmatSlotNames(children)];
        }
      });
      return newArr;
    },
  },
};
</script>

<style scoped>
</style>
