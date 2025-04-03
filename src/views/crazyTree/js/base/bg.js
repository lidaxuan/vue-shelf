import {baseConfig} from "./config";
import bgImg from "../../images/bg.jpg";

export default class back {
  constructor(ctx) {
    this.ctx = ctx
  }
  render() {
    let bg = new Image()
    bg.src = bgImg
    // bg.onerror = function() {
    // 	console.error('图片加载失败，请检查路径或跨域配置');
    // };
    //
    bg.onload = () => {
      this.ctx.drawImage(bg, 0, 0, baseConfig.width, baseConfig.height)
    };
  }
}