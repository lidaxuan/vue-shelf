<template>
  <div class="ml20">
    <div v-for="(item, index) in node" :key="index">
      <div class="flex" :id="`${parentIndex}-${index}`">
        <div class="mr10 draggable">○</div>
        <!-- {{ getID() }} -->
        <!-- {{ `${parentIndex}-${index}` }} -->
        <!-- @keydown.tab.prevent="addSiblingNode(index)" -->
        <div
          :ref="`div-${parentIndex}-${index}`"
          :id="`div-${parentIndex}-${index}`"
          class="contentEditableBox"
          @keydown.enter.prevent="addChildNode(item, index)"
          @keydown="handleKeyDown($event, item, index)"
          contentEditable
          @input="updateText($event, index)"
          @blur="blur"
          placeholder="请输入内容"
          data-text="Enter text here"
          v-html="item.text"
        ></div>
      </div>
      <div v-if="item.children">
        <TreeNode :node="item.children" :parentIndex="`${parentIndex ? parentIndex + '-' : ''}${index}`"></TreeNode>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TreeNode",
  props: {
    node: {
      type: Array,
      required: true
    },
    parentIndex: {
      type: [Number, String],
      default: () => null
    }
  },
  data() {
    return {
      index: null,
      text: null,
      timeoutId: null
    };
  },
  computed: {},
  methods: {
    getId(index) {
      if (this.parentIndex) {
        // return `${this.parentIndex}-${index}`;
      }
      return "";
    },
    getID() {
      return Math.random();
    },
    addSiblingNode(index) {
      // const newNode = {
      //   text: "",
      //   children: []
      // };
      // this.$parent.node.splice(index + 1, 0, newNode);
    },
    handleKeyDown(event, item, index) {
      if (event.shiftKey && event.keyCode === 9) {
        const arr = this.parentIndex.split("-");
        this.$emit("spliceData", arr);
        window.spliceData(arr, this.node.splice(index, 1)[0]);
        event.preventDefault();
      }
    },
    addChildNode(node, index) {
      console.log(node);
      const newNode = {
        text: "",
        children: []
      };
      node.children.unshift(newNode);
      console.log(`div-${this.parentIndex}-${index}-0`);
      this.$nextTick(() => {
        document.getElementById(`div-${this.parentIndex}-${index}-0`).focus();
        // this.$refs[`div-${this.parentIndex}`].focus();
        console.log(this.$refs[`div-${this.parentIndex}-${index}-0`]);
      });
    },
    blur() {
      if (this.index == 0 || this.index) {
        this.node[this.index].text = this.text;
      }
    },
    updateText(event, index) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      // this.timeoutId = setTimeout(() => {
      // this.node[index].text = event.target.textContent;
      this.index = index;
      this.text = event.target.textContent;
      // }, 500);
    }
  }
};
</script>
<style lang="scss" scoped>
.contentEditableBox {
  &:focus-visible {
    outline: none;
  }
}
/* .input {
  width: 200px;
  min-height: 24px;
  font-size: 14px;
  padding: 5px 8px;
  border: 1px solid #ddd;
}
.input[contentEditable="true"]:empty::before {
  content: attr(data-text);
  background: #000;
} */
</style>
