<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-04-16 15:23:15
 * @FilePath: /vue-shelf/src/components/Preview/image.vue
-->

<script>
import process from '@/env/index';

const Size = ['contain', 'cover', 'auto'];

export default {
  name: 'PreviewImage',
  props: {
    // 图片地址
    src: {
      type: String,
      required: true,
    },
    // 宽度
    width: {
      type: [Number, String],
    },
    // 高度
    height: {
      type: [Number, String],
    },
    // 最大宽度
    maxWidth: {
      type: [Number, String],
      default: () => '100%',
    },
    // 最大高度
    maxHeight: {
      type: [Number, String],
    },
    // 适配方式
    size: {
      type: String,
      default: () => Size[2],
      validator: (value) => Size.includes(value),
    },
    radius: {
      type: String | Number,
      default: () => 4,
    },
    doMain: {
      type: String,
      default: () => 4,
    },
  },
  methods: {
    getAddress() {
      if (/^\/\//.test(this.src)) {
        return this.src;
      }
      if (/^http/.test(this.src)) {
        return this.src;
      }
      return `${this.doMain || process.env.VUE_APP_API_Domain}${this.src}`;
    },
    humpToUnderline(str) {
      return str.replace(/([A-Z])/g, '-$1').toLowerCase();
    },
    ispx(arg) {
      if (!isNaN(arg - 0)) {
        const reg = /^[0-9]+.?[0-9]*$/g;
        if (reg.test(arg - 0)) {
          return arg + 'px';
        }
      }
      return arg;
    },
  },
  render(createElement) {
    const style = [];
    ['width', 'height', 'maxWidth', 'maxHeight'].forEach((key) => {
      if (this[key]) {
        const name = this.humpToUnderline(key);
        const value = this.ispx(this[key]);
        style.push(`${name}: ${value};`);
      }
    });
    console.log(this.size === Size[2]);
    // 图片自适应
    if (this.size === Size[2]) {
      console.log(this.radius-0);
      let radius = this.radius-0;
      return createElement('img', {
        attrs: {
          src: this.getAddress(),
          style: style.concat([`border-radius: ${radius}px`]).join(' '),
        },
      });
    }
    // 背景自适应
    style.push(`background: url(${this.getAddress()}) center / ${this.size} no-repeat;`);
    return createElement('span', {
      attrs: {
        style: style.concat([`border-radius: ${radius}px`]).join(' '),
      },
    });
  },
};
</script>