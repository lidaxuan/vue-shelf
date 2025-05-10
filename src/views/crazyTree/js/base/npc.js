import {IMAGES, baseConfig} from "./config";

export default class npc {
  constructor(ctx) {
    this.ctx = ctx
    this.posi = true
    /*定义血条*/
    this.blood = baseConfig.baseBlood
    // this.img = new Image()
    // this.img.src = IMAGES.npcImg

    this.images = {
      normal: new Image(),
      move: new Image(),
      die: new Image(),
    }
    this.images.normal.src = IMAGES.npcImg
    this.images.move.src = IMAGES.npcMove
    this.images.die.src = IMAGES.npcDie
    this.img = this.images.normal // 当前显示图片
  }

  update(type) {
    // this.img.src = src
    if (type === 'move') {
      this.img = this.images.move
    } else if (type == "die") {
      this.img = this.images.die
    } else {
      this.img = this.images.normal
    }
  }

  render() {
    this.treePosition()
    if (this.posi) {
      this.ctx.drawImage(this.img, this.x, this.y, 100, 100)
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
    // this.y = 300 - 180
    this.y = baseConfig.height - 160
  }

  renderLifebar() {
    // console.log("this.blood", this.blood)
    if (this.blood <= 0) {
      return;
    }
    this.blood = this.blood - 16
    // this.ctx.fillStyle = "#222"
    // this.ctx.fillRect(baseConfig.width / 2 - 95, 30, 190, 30)
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)"
    this.ctx.fillRect(baseConfig.width / 2 - 90, 35, 190, 20)
    this.ctx.fillStyle = "red"; // 进度调颜色
    this.ctx.fillRect(baseConfig.width / 2 - 90, 35, 180 * (this.blood / baseConfig.baseBlood), 20)
    const path2D = new Path2D();
    path2D.moveTo(10, 10);
    path2D.lineTo(290, 10);
    path2D.lineTo(290, 140);
    path2D.lineTo(10, 100);
    path2D.closePath();
  }
}
