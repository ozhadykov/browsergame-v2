import Player from "./player.js";
import ElementList from "./elementList.js";
import {Background} from "./background.js";
import {levels} from "../data/levels.js";
import {Platform} from "./platform.js";

import { Menu } from "../src/base-classes/";
import { CanvasManager } from "../src/classes/canvas-manager.js";

export default class Game {

  static instance = null

  /**
   *
   * @param ctx
   * @param canvas
   * @param level
   * @param jumpChargingBar
   * @param jumpChargingBarCanvas
   */

  constructor(ctx, canvas, jumpChargingBar, jumpChargingBarCanvas, level = 0) {
    // using single tone to use in submodules
    if (Game.instance)
      return Game.instance

    // request animation frame handle
    this.raf = null
    this.canvas = canvas
    this.ctx = ctx
    this.jumpChargingBarCanvas = jumpChargingBarCanvas
    this.jumpChargingBar = jumpChargingBar
    this.instance = this
<<<<<<< HEAD
    
    this.canvasManager = new CanvasManager()
    this.iunputManager = new InputManager()
    this.elementList = null
    this.background = null
    this.player = null
    this.level = level
    this.chargingBar = null
    this.pauseMenu = new Menu()
    this.mainMenu = new Menu()
    this.areYouSureMenu = new Menu()
=======
>>>>>>> master

  }

  static getInstance() {
    if (!Game.instance) {
      const canvas = document.getElementById("my-canvas");
      const ctx = canvas.getContext("2d");

      const jumpChargingBarCanvas = document.getElementById("my-jumpChargingBarCanvas");
      const jumpChargingBar = jumpChargingBarCanvas.getContext("2d");
      Game.instance = new Game(ctx, canvas, jumpChargingBar, jumpChargingBarCanvas)
    }

    return Game.instance
  }

  start(level) {

    // creating element List
    this.elementList = new ElementList()

    // creating game elements
    this.background = new Background({
      position: {
        x: 0,
        y: 5
      },
      imageSrc: '../assets/background/Background_Kanalisation2.png',
    })

    const collisionBlocks = this.generatePlatformsForLevel(0)
    this.player = new Player({
      position: {
        x: 0,
        y: 440
      },
      height: 50,
      width: 50,
      scale: 0.75,
      imageSrc: '../assets/Char/CharSheetWalk.png',
      cropBoxPosition: {x: 0, y: 100},
      collisionBlocks,
    })

    // adding all elements to List
    this.elementList.add(this.background)
    this.elementList.add(this.player)
    collisionBlocks.forEach(platform => this.elementList.add(platform))

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

      //this.jumpChargingBar.save()
      //finde das kleinere besser aber nur mein geschmack. Falls geändert müssen wir auch den Sprung entsprechend anpassen
      this.ctx.scale(2, 2)
      this.ctx.translate(this.player.cameraBox.position.x, -this.player.cameraBox.position.y)

      //--- clear screen
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)

      this.jumpChargingBar.fillStyle = 'white'
      this.jumpChargingBar.fillRect(0, 0, this.jumpChargingBarCanvas.clientWidth, this.jumpChargingBarCanvas.clientHeight)

      // drawing elements
      this.elementList.draw(this.ctx, this.canvas)
      // animating
      this.elementList.action()
      if (this.player.keys.w.pressed) {
        this.drawjumpChargingBar()
      }

      // calling animation function again
      this.raf = window.requestAnimationFrame(this.tick.bind(this))
      this.ctx.restore()
    } else {
      this.openPauseMenu(this.canvas)
      
    }
  }

  themeManager() {
    if (!this.player.keys.pause.pressed) this.theme.pause()
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
        this.jumpChargingBar.fillStyle = `rgb(${(255 - i/5)  },0 , 0)`
        this.jumpChargingBar.fillRect(0, this.jumpChargingBarCanvas.clientHeight - this.jumpChargingBarCanvas.clientHeight * (i / this.player.maxJumpCharge), this.jumpChargingBarCanvas.clientWidth, this.jumpChargingBarCanvas.clientHeight / 10)
      }
    }
  }

  generatePlatformsForLevel (level){
    const levelMarkup = levels[level].replace(/\s+/g, '').split('+')
    const platforms = []

    levelMarkup.forEach((levelRow, y) => {
      levelRow.split('').forEach((levelEl, x) => {
        // TODO: Define, what kind of platform should be created
        if (levelEl !== '-') {
          // if ()
          const platformEl = new Platform({
            position: {
              x: x * 16,
              y: y * 16,
            },
            imageSrc: '../assets/platform/block.png',
            height: 16,
            width: 16,
          })
          platforms.push(platformEl)
        }
      })
    })

    return platforms
  }


  openPauseMenu() {
    this.canvas.style.display = "none"
    this.jumpChargingBarCanvas.style.display = "none"
    document.getElementById('pauseMenu').style.display = "block"
  }

  closePauseMenu() {
    this.canvas.style.display = "block";
    this.jumpChargingBarCanvas.style.display = "block"
    document.getElementById('pauseMenu').style.display = "none"
    this.raf = window.requestAnimationFrame(this.tick.bind(this))
  }

  areYouSureMainMenu() {
    document.getElementById('pauseMenu').style.display = "none"
    document.getElementById('goToMainMenu_ARE_YOU_SURE').style.display = "block"
  }

  openMainMenu() {
    document.getElementById('goToMainMenu_ARE_YOU_SURE').style.display = "none"
    document.getElementById('mainMenu').style.display = "block"
  }

  continuePause() {
    document.getElementById('goToMainMenu_ARE_YOU_SURE').style.display = "none"
    document.getElementById('pauseMenu').style.display = " block"
  }
}

