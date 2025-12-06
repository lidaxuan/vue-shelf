<template>
  <EDrawerSp title="编辑营销话术" :visible.sync="visible" :wrapperClosable="false" :confirm-loading="submitLoading" :size="1080" @confirm="confirm" @cancel="close">
    <div class="info-container">
      <div class="left">
        <el-card class="mb-20">11</el-card>
        <el-card>22</el-card>
      </div>
      <div class="right">
        <el-card>33</el-card>
        <el-card>44</el-card>

      </div>
    </div>
  </EDrawerSp>
</template>

<script>
import EDrawerSp from "./drawer.vue"
import Vue from 'vue';

Vue.directive('number', {
  bind(el, binding, vnode) {
    const decimalPlaces = binding.value ?? 4; // Use provided value or default to 4 decimal places

    el.addEventListener('input', (event) => {
      let value = event.target.value;
      let formattedValue = value.replace(/[^0-9.]/g, '');
      if (decimalPlaces === 0) {
        formattedValue = formattedValue.replace(/\./g, '');
      } else {
        const parts = formattedValue.split('.');
        if (parts.length > 2) {
          parts.pop(); // Remove extra decimal points
          formattedValue = parts.join('.');
        }
        if (parts[1]) {
          parts[1] = parts[1].slice(0, decimalPlaces);
          formattedValue = parts.join('.');
        }
      }
      event.target.value = formattedValue;
      vnode.componentInstance.$emit('input', formattedValue);
    });
  }
});

export default {
  data() {
    return {
      visible: !false,
      submitLoading: false,
      ruleForm: {}
    };
  },
  components: {
    EDrawerSp
  },
  computed: {},
  mounted() {
  },
  methods: {

    confirm() {
      this.visible = false;
    },
    close() {
      this.visible = false;
    },
    open(row) {
      this.submitLoading = false;
      const g1 = row.officialPrice?.split("-") || ["", ""];
      const g2 = row.factoryPrice?.split("-") || ["", ""];
      this.ruleForm = Object.assign({}, row, {
        price1: g1[0],
        price2: g1[1],
        price3: g2[0],
        price4: g2[1]
      });
      this.visible = true;
      this.fetchPublicGetCarDictHeader();
    },
  }
};
</script>

<style lang="scss" scoped>
.info-container {
  display: flex;
  width: 100%;
  height: 100%;
  .left {
    width: 280px;
    margin-right: 20px;
  }
  .right{
    flex: 1;
  }
}
</style>

