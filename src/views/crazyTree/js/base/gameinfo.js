
import {baseConfig} from "./config";
export default class gameinfo {
  constructor(ctx) {
    this.ctx = ctx
  }

  render(score) {
    this.ctx.font = "30px Microsoft YaHei"
    this.ctx.fillStyle = "#ffffff"
    this.ctx.fillText("得分：" + score, baseConfig.width / 2 - 50, 100)
  }



  gameOver(score) {
    this.ctx.fillStyle = "#883a3a"
    this.ctx.fillRect(baseConfig.width / 2 - 150, baseConfig.height / 2 - 100, 300, 160)
    this.ctx.font = "24px Microsoft YaHei"
    this.ctx.fillStyle = "#fefefe"
    this.ctx.fillText('游戏结束', baseConfig.width / 2 - 50, baseConfig.height / 2 - 100 + 40)

    this.ctx.fillText('得分: ' + score, baseConfig.width / 2 - 50, baseConfig.height / 2 - 100 + 80)

    this.ctx.fillRect(baseConfig.width / 2 - 100, baseConfig.height / 2, 200, 50)
    this.ctx.fillStyle = "#883a3a"
    this.ctx.fillText('重新开始', baseConfig.width / 2 - 50, baseConfig.height / 2 - 100 + 130)

    // this.ctx.fillRect(baseConfig.width / 2 - 100, baseConfig.height / 2, 400, 50)
    // this.ctx.fillStyle = "#883a3a"
    // this.ctx.fillText('返回', baseConfig.width / 2 - 50, baseConfig.height / 2 - 100 + 130)

    this.btnArea = {
      startX: baseConfig.width / 2 - 150,
      startY: baseConfig.height / 2 - 100,
      endX: baseConfig.width / 2 + 150,
      endY: baseConfig.height / 2 - 100 + 160
    }
  }
}
