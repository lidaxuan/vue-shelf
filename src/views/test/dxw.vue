<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-09-17 18:28:28
 * @FilePath: /vue-shelf/src/views/dxw.vue
-->
<template>
  <div>
    <DTable :dConfig="dConfig" :elConfig="elConfig" :cellBox="cellBox" @onEvent="onEvent" />
  </div>
</template>

<script>
import DTable from '../components/d-table/src/main.vue';

export default {
  components: {
    DTable,
  },
  data() {
    return {
      dConfig: {
        saveDATA: [], // 请求回来的所有数据
        // 多级表头配置
        headData: [
          {
            //   不需要的信息不要传
            label: '编号',
            align: 'center',
            prop: 'date',
            minWidth: '90',
            fixed: 'left',
          },
          {
            label: '用户信息',
            align: 'center',
            children: [
              {
                label: '名称',
                align: 'center',
                prop: 'name',
                minWidth: '180',
              },
              {
                label: '省市区',
                align: 'center',
                prop: 'address',
                children: [
                  {
                    label: '省份',
                    align: 'center',
                    prop: 'province',
                    minWidth: '150',
                  },
                  {
                    label: '市区',
                    align: 'center',
                    prop: 'city',
                    minWidth: '150',
                  },
                  {
                    label: '地址',
                    align: 'center',
                    prop: 'address',
                    minWidth: '300',
                  },
                ],
              },
            ],
          },
        ],
        start: 0,
        end: 30, // 3倍的pageList
        starts: 0, // 备份[保持与上一样]
        ends: 30, // 备份[保持与上一样]
        pageList: 10, // 当前一屏显示多少填多少，根据elConfig.maxHeight和dConfig.itemHeight以及你自定义td样式的设置来的
        itemHeight: 53, // 每一行高度
        timeOut: 400, // 延迟
      },
      elConfig: {
        style: 'width: 950px',
        maxHeight: '500',
        border: false,
        stripe: false,
      },
      cellBox: {
        show: true,
        fixed: 'right',
        label: '操作2',
        width: '180',
        align: 'center',
        children: [
          {
            size: 'mini',
            type: '',
            label: '编辑1',
            evName: 'onEdit',
          },
          {
            size: 'mini',
            type: 'danger',
            label: '删除2',
            evName: 'onDel',
          },
        ],
      },
    };
  },
  created() {
    this.dConfig.saveDATA = [];
    for (let i = 0; i < 50000; i++) {
      this.dConfig.saveDATA.push({
        date: i,
        name: '王小虎' + i,
        address: '上海市普陀区金沙江路 1518 弄',
        province: '上海',
        city: '普陀区',
        zip: '200333' + i,
      });
    }
  },
  methods: {
    onEvent(data) {
      console.log(data);
    },
  },
};
</script>
