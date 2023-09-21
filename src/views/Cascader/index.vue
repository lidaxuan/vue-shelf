<template>
  <div>
    <div class="block">
      <span class="demonstration">多选选择任意一级选项</span>
      <el-cascader
        v-model="value"
        :options="options"
        @change="change"
        :props="{ multiple: true, checkStrictly: true, value: 'value',emitPath: false }"
        clearable>
      </el-cascader>
    </div>
  </div>

</template>
<script>
let check = []; // 111111
export default {
  data() {
    return {
      value: [],
      options: [ // 这是数据   别动 你看就行
        {
          value: 'zhinan',
          label: '指南',
          children: [{value: 123, label: '全选'},
            {value: 'fankui', label: '反馈'},
            {value: 'xiaolv', label: '效率'},
            {value: 'kekong', label: '可控'}]
        },
        {
          value: 'zujian', label: '组件', children: [
            {value: 456, label: '全选'},
            {value: 'color', label: 'Color 色彩'},
            {value: 'typography', label: 'Typography 字体'},
            {value: 'icon', label: 'Icon 图标'},
            {value: 'button', label: 'Button 按钮'}]
        },
        {
          value: 'asde', label: '组件', children: [
            {value: 789, label: '全选'},
            {value: '11', label: '11'},
            {value: '22', label: '22'},
            {value: '33', label: '33'},
            {value: '44', label: '44'}]
        }],
      allids: [123, 456, 789], // 这里  将所有的全选id 拿出来 例如  这里你递归去拿 OK!!  别动鼠标OK  全选的id 你在拿到数据的时候自己生成
      // 好下一步
      selectPId: [],
      oldArr: [],
    };
  },
  methods: {
  // change 事件
    async change(val) {
      // this.value = val
      const childids = val.filter(item => {
        if (!this.allids.includes(item)) {
          return item;
        }
      }) // 也就是在这里  最后
      // 将全选的  筛出来 假如 val = [123] 那就只有123 看到 了吧
      this.selectPId = val.filter(item => {
        if (this.allids.includes(item)) {
          return item;
        }
      })
      console.log('this.selectPId', this.selectPId)

      check = [] // 这个参数 在这里定义 17 行 每次清空
      if (this.selectPId.length) { // 如果有数据
        await this.getIds(this.options);
      }
      this.value = check; // 在这里拼接 就OK了

      console.log(check) // 看控制台
    },
    getIds(list, parent = {}) {
      // 做一个简单的递归
      for (let i = 0; i < list.length; i++) {
        if (this.selectPId.includes(list[i].value)) {
          // 这里 拿到 全选的 同级的所有id 也就是父级下的所有子级id
          const ids = parent.children.map(item => item.value).filter((item, index) => {
              return item // !this.value.includes(item);
          })
          check = check.concat(ids); // 然后进行拼接
        }
        if (list[i].children && list[i].children.length) {
          this.getIds(list[i].children, list[i]) // 这里去递归 因为有children
        }
      }
    }
  }
};
</script>