import Databus from './base/databus.js'
import Back from './base/bg.js'
import Tree from './base/tree.js'
import Npc from './base/npc.js'
import Gameinfo from './base/gameinfo.js'


let databus = new Databus()
let screenHeight = window.innerHeight
let screenWidth = window.innerWidth

// let treeLeft = "images/treeLeft.png"
// let treeCen = "images/tree.png"
// let treeRight = "images/treeRight.png"

// let npcImg = 'images/npc.png'
// let npcMove = 'images/npcMove.png'
// let npcDie = 'images/npcDie.png'

import treeLeft from "../images/treeLeft.png"
import treeCen from "../images/tree.png"
import treeRight from "../images/treeRight.png"

import npcImg from '../images/npc.png'
import npcMove from '../images/npcMove.png'
import npcDie from '../images/npcDie.png'

export default class main {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext('2d')
    this.restart = false
    this.init()
  }

  init() {
    databus.reset()
    this.canvas.removeEventListener('touchstart', this.touchHandler)

    // wx.triggerGC()
    /*降低帧率*/
    //wx.setPreferredFramesPerSecond(20)
    this.back = new Back(this.ctx);
    // return;
    this.npc = new Npc(this.ctx)
    this.gameinfo = new Gameinfo(this.ctx)

    for (var i = 1; i < 12; i++) {
      let _img = this.randomTree()
      let _tree = databus.pool.getItemByClass('tree', Tree, this.ctx, _img.img, _img.p)
      databus.pushTree(_tree)
    }
    this.touch()
    // setTimeout(() => {
    window.requestAnimationFrame(this.loop.bind(this), this.canvas)
    // }, 1000)
  }

  run() {
    /*计算当前点击位置*/
    this.collisionDetection()
    if (databus.gameOver) {
      return
    }
    let tap = this.touchX >= screenWidth / 2
    if (!(this.npc.posi == tap)) {
      this.npc.posi = !this.npc.posi
      return
    }

    databus.score++
    this.npc.blood = (this.npc.blood + 160 >= 6000) ? 6000 : this.npc.blood + 160
    /*木头池*/
    databus.shiftTree() //弹出
    let _img = this.randomTree()
    let _tree = databus.pool.getItemByClass('tree', Tree, this.ctx, _img.img, _img.p)
    databus.pushTree(_tree)
  }

  /*随机产生木头*/
  randomTree() {
    /*判断上一个木头*/
    let _a, _b, _random = true;
    let random = Math.random()
    let last = true
    if (databus.trees.length > 0) {
      last = databus.trees[databus.trees.length - 1].posiDr
    }
    if (last == "center") {
      if (random <= 0.3334) {
        _a = treeRight
        _b = true
      } else if (random > 0.3334 && random <= 0.6667) {
        _a = treeLeft
        _b = false
      } else {
        _a = treeCen
        _b = "center"
      }
    } else {
      _a = treeCen
      _b = "center"
    }
    return {
      img: _a,
      p: _b
    }
  }

  /*碰撞检测*/
  collisionDetection() {
    let isCollision = (this.npc.posi == databus.trees[0].posiDr)
    isCollision && (databus.gameOver = true) && (this.npc.update(npcDie))
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
    console.log("点击了")
    this.npc.update(npcMove)
    setTimeout(() => {
      this.npc.update(npcImg)
    }, 100)
    this.touchX = e.touches[0].clientX;
    this.run()
  }

  touch() {
    this.touchCuttrees = this.touchCuttree.bind(this) // 更改this指向
    this.canvas.addEventListener('touchstart', this.touchCuttrees)
  }

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
      console.log(11111111111111111)
      databus.gameOver = true
      this.gameinfo.gameOver(databus.score)
      this.canvas.removeEventListener('touchstart', this.touchCuttrees)
      this.touchHandler = that.touchEventHandler.bind(this)
      this.canvas.addEventListener('touchstart', this.touchHandler)
      return
    } else {
      console.log(22222222222222)
      this.gameinfo.render(databus.score)
    }
    window.requestAnimationFrame(this.loop.bind(this), canvas)
    // return;
  }

}