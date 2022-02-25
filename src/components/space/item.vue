<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-01-08 09:45:53
 * @FilePath: /vue-shelf/src/components/space/item.vue
-->
<script>
export default {
  name: '',
  props: {
    node: Object,
  },
  methods: {},
  render(createElement) {
    if (this.node.split) {
      return createElement(this.node.tag, this.node.split, {
        attrs: {},
      });
    }
    return this.node;
  },
};
</script>