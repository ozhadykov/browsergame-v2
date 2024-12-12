import Player from "./player.js";

import ElementList from "./elementList.js";
import { levels } from "../data/levels.js";
import { BaseBox, BaseElement, Menu } from "../src/base-classes/";
import { CanvasManager } from "../src/classes/canvas-manager.js";
import { Level } from "../src/classes/level.js";
import Player2 from "../src/classes/player.js";

export default class Game {

  static instance = null

  /**
   *
   * @param ctx
   * @param canvas
   * @param levelId
   */

  constructor(ctx, levelId = 0) {
    // using single tone to use in submodules
    if (Game.instance)
      return Game.instance

    // request animation frame handle
    this.raf = null
    this.ctx = ctx
    this.instance = this
    this.scale = 2
    this.canvasManager = new CanvasManager('#my-canvas')
    this.elementList = null
    this.player = null
    this.level = new Level({
      levelId,
      levelString: levels.at(levelId),
      background: new BaseElement({
        x: 0,
        y: 0,
        imageSrc: '../assets/background/Background_Kanalisation2.png',
        imageCropBox: new BaseBox({
          y: 5,
          height: this.canvasManager.getCanvas().height,
          width: this.canvasManager.getCanvas().width
        }),
        framesX: 1,
        framesY: 1
      })
    })
    this.background = this.level.getBackground()
    this.chargingBar = new CanvasManager('#my-jump-charging-bar')
    this.pauseMenu = new Menu('#pause-menu')
    this.mainMenu = new Menu('#main-menu')
    this.areYouSureMenu = new Menu('#are-you-sure-menu')

  }

  static getInstance() {
    if (!Game.instance) {
      const canvas = document.getElementById("my-canvas");
      const ctx = canvas.getContext("2d");

      const jumpChargingBarCanvas = document.getElementById("my-jump-charging-bar");
      const jumpChargingBar = jumpChargingBarCanvas.getContext("2d");
      Game.instance = new Game(ctx, canvas, jumpChargingBar, jumpChargingBarCanvas)
    }
    return Game.instance
  }

  start(level) {

    // creating element List
    this.elementList = new ElementList()

    // creating game elements
    // generating platform blocks
    const platformBlocks = this.level.generatePlatfroms()

    this.player = new Player2({
      x: 0,
      y: 440,
      scale: 0.35,
      imageSrc: '../assets/Char/CharSheetWalk.png',
      imageCropBox: new BaseBox({
        x: 0, 
        y: 100,
        height: 99,
        width: 100
      }),
      platformBlocks,
      framesX: 9,
      framesY: 3
    })

    // adding all elements to List
    this.elementList.add(this.background)
    this.elementList.add(this.player)
    platformBlocks.forEach(platform => this.elementList.add(platform))

    // this is important for animation purposes, do not need now
    this.timeOfLastFrame = Date.now()

    // here we are requiring window to reload to max framerate possible
    this.raf = window.requestAnimationFrame(this.tick.bind(this))

  }


  stop() {
    window.cancelAnimationFrame(this.raf)
  }

  tick() {
    if (!this.player.keys.pause.pressed) {
      this.ctx.save()

      //finde das kleinere besser aber nur mein geschmack. Falls geändert müssen wir auch den Sprung entsprechend anpassen
      this.ctx.scale(2, 2)
      this.ctx.translate(
        this.player.getCameraBox().getX(), 
        -this.player.getCameraBox().getY())

      //--- clear screen
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(0, 0, this.canvasManager.getCanvas().clientWidth, this.canvasManager.getCanvas().clientHeight)

      const jumpChargingBarCtx = this.chargingBar.getContext()
      const jumpChargingBarCanvas = this.chargingBar.getCanvas()
      jumpChargingBarCtx.fillStyle = 'white'
      jumpChargingBarCtx.fillRect(0, 0, 
        jumpChargingBarCanvas.clientWidth, 
        jumpChargingBarCanvas.clientHeight)

      // drawing elements
      this.elementList.draw(this.ctx, this.canvasManager.getCanvas())
      // animating
      this.elementList.action()
      if (this.player.keys.w.pressed) {
        this.drawjumpChargingBar()
      }

      // calling animation function again
      this.raf = window.requestAnimationFrame(this.tick.bind(this))
      this.ctx.restore()
    } else {
      // open pause menu and hiding elements
      this.pauseMenu.show()
      this.canvasManager.show()
      this.chargingBar.show()
    }
  }

  themeManager() {
    if (!this.player.keys.pause.pressed) 
      this.theme.pause()
    else {
      this.theme = new Audio('../assets/Sounds/chipTune.wav')
      this.theme.preload = "auto";
      this.theme.volume = 0.05;
      this.theme.play()
    }
  }

  drawjumpChargingBar() {
    for (let i = 0; i <= this.player.maxJumpCharge; i += this.player.maxJumpCharge / 10) { // auch mit /20; /100 möglich
      if (Date.now() - this.player.chargingJumpTime >= i) {
        const charginBarCanvas = this.chargingBar.getCanvas()
        const charginBarCtx = this.chargingBar.getContext()

        charginBarCtx.fillStyle = `rgb(${(255 - i/5)  },0 , 0)`
        charginBarCtx.fillRect(0, 
          charginBarCanvas.clientHeight - charginBarCanvas.clientHeight * (i / this.player.maxJumpCharge), 
          charginBarCanvas.clientWidth, charginBarCanvas.clientHeight / 10)
      }
    }
  }

  getCanvasManager() {
    return this.canvasManager
  }

  getChargingBar() {
    return this.chargingBar
  }

  getMainMenu() {
    return this.mainMenu
  }

  getMapScale() {
    return this.scale
  }

  closePauseMenu() {
    this.canvasManager.show()
    this.chargingBar.hide()
    this.pauseMenu.hide()
    // why? i did not understand (c) Omar :) would like to know more
    this.raf = window.requestAnimationFrame(this.tick.bind(this))
  }

  areYouSureMainMenu() {
    document.getElementById('pause-menu').style.display = "none"
    document.getElementById('are-you-sure-menu').style.display = "block"
  }

  openMainMenu() {
    document.getElementById('are-you-sure-menu').style.display = "none"
    document.getElementById('main-menu').style.display = "block"
  }

  continuePause() {
    document.getElementById('are-you-sure-menu').style.display = "none"
    document.getElementById('pause-menu').style.display = " block"
  }
}

