import Databus from './base/databus.js'
import Back from './base/bg.js'
import Tree from './base/tree.js'
import Npc from './base/npc.js'
import Gameinfo from './base/gameinfo.js'
import {baseConfig, IMAGES} from "./base/config";
import AudioObj from "./base/audio.js";

let databus = new Databus()
export default class main {
  constructor(el, isMusic, isSoundEffects) {
    this.canvas = document.getElementById(el);
    this.ctx = this.canvas.getContext('2d');
    this.restart = false;
    this.isMusic = isMusic;
    this.isSoundEffects = isSoundEffects;
    this.bgAudio = null;
    this.gamePaused = !true;
    this.init()
  }

  init() {
    databus.reset()
    this.canvas.removeEventListener('touchstart', this.touchHandler)
    this.back = new Back(this.ctx);
    this.npc = new Npc(this.ctx)
    this.gameinfo = new Gameinfo(this.ctx)
    Array.from({length: baseConfig.treeNum}).forEach((item, index) => {
      let _img = this.randomTree(index)
      databus.pushTree(databus.pool.getItemByClass('tree', Tree, this.ctx, _img.img, _img.p))
    })
    this.touch()
    // window.requestAnimationFrame(this.loop.bind(this), this.canvas)
    this.loop();
    this.updateAudio();
  }

  updateGameStatus(status) {
    this.gamePaused = status;
  }

  // 更新声音状态
  updatePlayStatus(key, val) {
    this[key] = val;
    this.updateAudio();
  }
  //
  updateAudio() {
    if (!this.bgAudio) {
      this.bgAudio = new AudioObj()
    }
    if (this.isMusic) {
      this.bgAudio.playAudio("bg");
    } else {
      this.bgAudio.stopAudio();
    }
  }
  // 1. 生产木头有问题 已解决
  // 2. 点击后只换了位置,没有砍  已解决
  run() {
    /*计算当前点击位置*/
    let tap = this.touchX >= baseConfig.width / 2
    if (!(this.npc.posi == tap)) { // 是否可以切换位置
      this.npc.posi = !this.npc.posi
      console.log("进来了")
      // return
    }

    this.collisionDetection()
    if (databus.gameOver) {
      return
    }
    this.npc.update("move")
    setTimeout(() => this.npc.update(), 200)
    databus.score++ // 得分+1
    this.npc.blood = (this.npc.blood + 160 >= baseConfig.baseBlood) ? baseConfig.baseBlood : this.npc.blood + 160
    databus.shiftTree() //弹出
    let _img = this.randomTree()
    databus.pushTree(databus.pool.getItemByClass('tree', Tree, this.ctx, _img.img, _img.p))
    this.collisionDetection() // 砍完之后检测如果当前这个和人物重叠了 那也就是死了
  }

  /*随机产生木头*/
  randomTree(index) {
    if (index < baseConfig.beforeTreeNum) {
      return {img: IMAGES.treeCen, p: "center"};
    }
    // 每 2 个树生成一次中心树，防止连续障碍
    if (index % 2 === 0 || (databus.score !== 0 && databus.score % 2 === 0)) {
      return {img: IMAGES.treeCen, p: "center"};
    }
    // return {img: IMAGES.treeCen, p: "center"};
    // 随机生成左/右树
    const rand = Math.round(Math.random()); // 0 或 1
    return {
      img: rand === 0 ? IMAGES.treeLeft : IMAGES.treeRight,
      p: Boolean(rand)
    };

    /*if (index < baseConfig.beforeTreeNum) { // 默认前2个是中间树段,保证一上来不会死
      console.log(33)
      return {img: IMAGES.treeCen, p: "center"};
    }
    if (index >= baseConfig.beforeTreeNum && index %2 == 0) {
      console.log(11)
      return {img: IMAGES.treeCen, p: "center"};
    }
    if (databus.score != 0 && databus.score % 2 == 0) {
      return {img: IMAGES.treeCen, p: "center"};
    }
    console.log(22)
    const rand = Math.round(Math.random());
    return {img: [IMAGES.treeLeft, IMAGES.treeRight][rand], p: Boolean(rand)};*/
  }

  /*碰撞检测*/
  collisionDetection() {
    let isCollision = (this.npc.posi == databus.trees[0].posiDr)
    if (isCollision)  {
      this.bgAudio.stopAudio();
      databus.gameOver = true;
      this.npc.update("die");
    }
  }

  //游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    let area = this.gameinfo.btnArea
    if (x >= area.startX && x <= area.endX && y >= area.startY && y <= area.endY) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.init()
    }
  }

  /*
  * 点击后:
  * 1. 判断死亡
  * 2. 交换位置
  * 3. 切换砍树图片
  * 4. 砍树
  * 5. 更新
  * */
  touchCutTree(e) {
    e.preventDefault()
    if (databus.gameOver) {
      return
    }
    if (this.isSoundEffects) {
      const audioObj = new AudioObj()
      audioObj.playAudio("duang");
    }
    this.touchX = e.touches[0].clientX;
    this.run()
  }

  // 绑定点击事件
  touch() {
    this.touchCuttrees = this.touchCutTree.bind(this) // 更改this指向
    this.canvas.addEventListener('touchstart', this.touchCuttrees)
  }

  // 循环
  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.back.render()
    this.npc.render()
    console.log(123)
    for (var k in databus.trees) {
      databus.trees[k].renderTree(k)
    }
    this.npc.renderLifebar()

    if (this.gamePaused) {
      // this.canvas.removeEventListener('touchstart', this.touchCuttrees)
      return;
    }

    /*检测结束*/
    if (databus.gameOver || this.npc.blood < 0.017) {
      databus.gameOver = true
      this.gameinfo.gameOver(databus.score)
      this.canvas.removeEventListener('touchstart', this.touchCuttrees)
      this.touchHandler = this.touchEventHandler.bind(this)
      this.canvas.addEventListener('touchstart', this.touchHandler)
      return
    } else {
      this.gameinfo.render(databus.score)
    }
    window.requestAnimationFrame(this.loop.bind(this), this.canvas)
  }
}
