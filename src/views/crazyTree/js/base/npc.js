let screenHeight = window.innerHeight
let screenWidth = window.innerWidth
import {baseConfig} from "./config";
import npcImg from "../../images/npc.png";

export default class npc {
  constructor(ctx) {
    this.ctx = ctx
    this.posi = true
    /*定义血条*/
    this.blood = 6000
    this.img = new Image()
    this.img.src = npcImg
    this.img.onerror = function () {
      // console.error('图片加载失败，请检查路径或跨域配置');
    };
    this.img.onload = () => { // 使用箭头函数保留外层 this 指向
      // console.log("成功123")
    };
  }
  update(src) {
    this.img.src = src
  }
  render() {
    this.treePosition()
    if (this.posi) {
      this.ctx.drawImage(this.img, this.x, this.y, 50, 30)
    } else {
      this.ctx.translate(300, 0);
      this.ctx.scale(-1, 1);
      // 下面画的图片是水平翻转的
      this.ctx.drawImage(this.img, this.x, this.y, 100, 100)
      // 恢复正常
      this.ctx.translate(300, 0);
      this.ctx.scale(-1, 1);
    }
  }
  treePosition() {
    if (this.posi) {
      this.x = baseConfig.width / 2 + 40
    } else {
      this.x = baseConfig.width / 2 - 25
    }
    this.y = 300 - 180
  }
  renderLifebar() {
    this.blood = this.blood - 16
    this.ctx.fillStyle = "#222"
    this.ctx.fillRect(baseConfig.width / 2 - 95, 30, 190, 30)
    this.ctx.fillStyle = "red"
    this.ctx.fillRect(baseConfig.width / 2 - 90, 35, 180 * (this.blood / 6000), 20)
  }
}