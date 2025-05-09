import {baseConfig} from "./config";
export default class tree {
  constructor(ctx, src = '', l = true) {
    this.ctx = ctx
    this.img = new Image()
    this.img.src = src
    this.posiDr = l  // false代表左边，true代表右边
  }

  update(src, posiDr) {
    this.img.src = src
    this.posiDr = posiDr
  }

  renderTree(i) {
    this.treePosition(i)
    this.ctx.drawImage(this.img, this.x, this.y, 218, 60)
  }

  treePosition(i) {
    // i++
    if (this.posiDr && this.posiDr != "center") {
      this.x = baseConfig.width / 2 - 56 // 右
    } else {
      this.x = baseConfig.width / 2 - 164 // 无树叶
    }
    // this.x = 100
    this.y = baseConfig.height - 128 - i * 60
  }

  renderMove() {
    if (!this.posiDr) {
      this.x = this.x + 16
    } else {
      this.x = this.x - 16
    }
    this.ctx.drawImage(this.img, this.x, this.y, 210, 60)
  }
}