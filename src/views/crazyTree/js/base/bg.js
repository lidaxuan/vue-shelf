import {baseConfig, IMAGES} from "./config";

export default class back {
  constructor(ctx) {
    this.ctx = ctx
    this.bg = new Image()
    this.bg.src = IMAGES.bgImg
  }

  render() {
    // bg.onload = () => {
    this.ctx.drawImage(this.bg, 0, 0, baseConfig.width, baseConfig.height)
    // };
  }
}
