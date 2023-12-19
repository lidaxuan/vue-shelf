<template>
  <div class="flex" style="justify-content: space-around">
    <!-- <MenuComponent></MenuComponent> -->
    <!-- <Draggable v-model="treeData" @end="onDragEnd" :options="dragOptions"> -->
    <TreeNode @spliceData="spliceData" :node="treeData" />
    <!-- </Draggable> -->
    <pre>{{ treeData }}</pre>
  </div>
</template>

<script>
import TreeNode from "./TreeNode.vue";
import Draggable from "vuedraggable";

export default {
  components: {
    TreeNode,
    Draggable
    // MenuComponent
  },
  data() {
    return {
      dragOptions: {
        group: "items",
        // 在拖拽过程中检查每个元素的 draggable 属性
        draggable: ".draggable"
      },
      treeData: [
        {
          text: "Root",
          children: [
            {
              text: "Child 1",
              children: [
                {
                  text: "Child 1-1",
                  children: []
                },
                {
                  text: "Child 1-2",
                  children: []
                }
              ]
            },
            {
              text: "xxxxx",
              children: [
                {
                  text: "Child 2-1",
                  children: []
                },
                {
                  text: "Child 2-2",
                  children: [
                    {
                      text: "Child 2-2-1",
                      children: []
                    }
                  ]
                }
              ]
            },
            {
              text: "Child 3",
              children: [
                {
                  text: "Grandchild 3-1",
                  children: []
                },
                {
                  text: "Child 3-2",
                  children: []
                }
              ]
            }
          ]
        },
        {
          text: "",
          children: []
        }
      ]
    };
  },
  mounted() {
    window.spliceData = (indexs, item) => {
      let copyIndexArr = [].concat(...indexs);
      copyIndexArr.pop();
      let data = copyIndexArr.reduce((pre, next) => {
        return pre[next].children;
      }, this.treeData);
      data.splice(Number(indexs[indexs.length - 1]) + 1, 0, item);
    };
  },
  methods: {
    onDragEnd(event) {
      // 更新数据接口
      console.log("Updated treeData:", this.treeData);
    },
    spliceData(arr) {
      arr.reduce((item) => {
        console.log(item);
      });
    }
  }
};
</script>
