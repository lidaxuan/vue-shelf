import Databus from './base/databus.js'
import Back from './base/bg.js'
import Tree from './base/tree.js'
import Npc from './base/npc.js'
import Gameinfo from './base/gameinfo.js'
import {baseConfig, IMAGES} from "./base/config";

let databus = new Databus()
export default class main {
  constructor(el) {
    this.canvas = document.getElementById(el);
    console.log(123, this.canvas)
    this.ctx = this.canvas.getContext('2d')
    this.restart = false
    this.init()
  }

  init() {
    databus.reset()
    this.canvas.removeEventListener('touchstart', this.touchHandler)
    this.back = new Back(this.ctx);
    this.npc = new Npc(this.ctx)
    this.gameinfo = new Gameinfo(this.ctx)
    /*for (var i = 1; i < 12; i++) {
      let _img = this.randomTree()
      let _tree = databus.pool.getItemByClass('tree', Tree, this.ctx, _img.img, _img.p)
      databus.pushTree(_tree)
    }*/
    // databus.pushTree(databus.pool.getItemByClass('tree', Tree, this.ctx, IMAGES.treeCen, "center"))
    Array.from({length: baseConfig.treeNum}).forEach((item, index) => {
      let _img = this.randomTree(index)
      databus.pushTree(databus.pool.getItemByClass('tree', Tree, this.ctx, _img.img, _img.p))
    })
    this.touch()
    window.requestAnimationFrame(this.loop.bind(this), this.canvas)
  }
  // 1. 生产木头有问题 已解决
  // 2. 点击后只换了位置,没有砍  已解决
  run() {
    /*计算当前点击位置*/
    this.collisionDetection()
    if (databus.gameOver) {
      return
    }
    let tap = this.touchX >= baseConfig.width / 2
    if (!(this.npc.posi == tap)) {
      this.npc.posi = !this.npc.posi
      console.log("进来了")
      // return
    }

    databus.score++
    this.npc.blood = (this.npc.blood + 160 >= baseConfig.baseBlood) ? baseConfig.baseBlood : this.npc.blood + 160
    /*木头池*/
    databus.shiftTree() //弹出
    let _img = this.randomTree()
    databus.pushTree(databus.pool.getItemByClass('tree', Tree, this.ctx, _img.img, _img.p))
    // databus.pushTree(databus.pool.getItemByClass('tree', Tree, this.ctx, IMAGES.treeCen, "center"))
  }
  /*随机产生木头*/
  randomTree(index) {
    if (index < baseConfig.beforeTreeNum) {
      return { img: IMAGES.treeCen, p: "center" };
    }
    // 每 2 个树生成一次中心树，防止连续障碍
    if (index % 2 === 0 || (databus.score !== 0 && databus.score % 2 === 0)) {
      return { img: IMAGES.treeCen, p: "center" };
    }
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

    /*var rand = Math.random();
    console.log(rand, databus.score)
    if (rand < 0.3334) {
      return {img: IMAGES.treeRight, p: true};
    } else if (rand < 0.6667) {
      return {img: IMAGES.treeLeft, p: false};
    }
    return {img: IMAGES.treeCen, p: "center"};*/
  }
  /*碰撞检测*/
  collisionDetection() {
    let isCollision = (this.npc.posi == databus.trees[0].posiDr)
    isCollision && (databus.gameOver = true) && (this.npc.update("die"))
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
  touchCuttree(e) {
    e.preventDefault()
    if (databus.gameOver) {
      return
    }
    // this.npc.update(IMAGES.npcMove)
    this.npc.update("move")
    setTimeout(() => {
      this.npc.update()
    }, 400)
    this.touchX = e.touches[0].clientX;
    this.run()
  }
  // 绑定点击事件
  touch() {
    this.touchCuttrees = this.touchCuttree.bind(this) // 更改this指向
    this.canvas.addEventListener('touchstart', this.touchCuttrees)
  }
  // 循环
  loop() {
    let that = this
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.back.render()
    this.npc.render()
    for (var k in databus.trees) {
      databus.trees[k].renderTree(k)
    }
    // return;
    this.npc.renderLifebar()

    /*检测结束*/
    if (databus.gameOver || this.npc.blood < 0.017) {
      databus.gameOver = true
      this.gameinfo.gameOver(databus.score)
      this.canvas.removeEventListener('touchstart', this.touchCuttrees)
      this.touchHandler = that.touchEventHandler.bind(this)
      this.canvas.addEventListener('touchstart', this.touchHandler)
      return
    } else {
      this.gameinfo.render(databus.score)
    }
    window.requestAnimationFrame(this.loop.bind(this), this.canvas)
  }
}