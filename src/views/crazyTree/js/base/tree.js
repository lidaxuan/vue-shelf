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
    // this.img.onload = () => {
    // document.body.append(this.img)
    this.ctx.drawImage(this.img, this.x, this.y, 207, 60)
    // }
  }

  treePosition(i) {
    // i++
    if (this.posiDr && this.posiDr != "center") {
      this.x = baseConfig.width / 2 - 54
    } else {
      this.x = baseConfig.width / 2 - 156
    }
    // this.x = 100
    this.y = baseConfig.height - 128 - i * 60
    // this.y = baseConfig.height - 60 - i * 60
    // this.y = 120
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