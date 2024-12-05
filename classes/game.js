import Player from "./player.js";
import ElementList from "./elementList.js";
import { generatePlatformsForLevel } from "../utils/PlatfromElementGenerator.js";
import { Background } from "./background.js";

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
    this.elementList = null

    // not sure if we really need this here, ask prof.
    this.level = level
    this.player = null
    this.instance = this
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
      imageSrc: '../assets/background/Background_Kanalisation.png',
    })
   
    const collisionBlocks = generatePlatformsForLevel(level)
    this.player = new Player({
      position: {
        x: 0,
        y: 440
      },
      height: 50,
      width: 50,
      scale: 0.45,
      imageSrc: '../assets/Char/CharSheetWalk.png',
      cropBoxPosition: { x: 0, y: 100 },
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
      if(this.player.keys.w.pressed)  {
        this.drawjumpChargingBar()
      }

      // calling animation function again
      this.raf = window.requestAnimationFrame(this.tick.bind(this))
      this.ctx.restore()
    } else {
      this.openPauseMenu(this.canvas)
    }
  }

  drawjumpChargingBar() {
    for(let i = 0; i <= this.player.maxJumpCharge; i += this.player.maxJumpCharge /10 ) { // auch mit /20; /100 möglich
      if(Date.now() - this.player.chargingJumpTime >= i) {
        //this.jumpChargingBar.fillStyle = 'rgb(0, 0, 0)'
        //this.jumpChargingBar.fillRect(10, this.jumpChargingBarCanvas.clientHeight - (i / 3.5), 80, 10)   Möglichkeit 1
        this.jumpChargingBar.fillStyle = `rgb(${Math.floor(255 - i / 5 )}, 0, 0)`
        console.log(`rgb(${Math.floor(255 - i / 5)}, 0, 0)`)
        this.jumpChargingBar.fillRect(10, this.jumpChargingBarCanvas.clientHeight - (i / 4), 80, 28)
      }
    }
    console.log(Date.now() - this.player.chargingJumpTime)
    /* if (Date.now() - this.player.chargingJumpTime > this.player.maxJumpCharge * 0) {   //Möglichkeit 2
      this.jumpChargingBar.fillStyle = 'red'
      this.jumpChargingBar.fillRect(25, 400, 50, 25)
    }
    if (Date.now() - this.player.chargingJumpTime >= this.player.maxJumpCharge * 0.125) {
      this.jumpChargingBar.fillStyle = 'green'
      this.jumpChargingBar.fillRect(25, 350, 50, 25)
    }
    if (Date.now() - this.player.chargingJumpTime >= this.player.maxJumpCharge * 0.25) {
      this.jumpChargingBar.fillStyle = 'blue'
      this.jumpChargingBar.fillRect(25, 300, 50, 25)
    }
    if (Date.now() - this.player.chargingJumpTime >= this.player.maxJumpCharge * 0.375) {
      this.jumpChargingBar.fillStyle = 'black'
      this.jumpChargingBar.fillRect(25, 250 , 50, 25)
    }
    if (Date.now() - this.player.chargingJumpTime >= this.player.maxJumpCharge * 0.5) {
      this.jumpChargingBar.fillStyle = 'violet'
      this.jumpChargingBar.fillRect(25, 200 , 50, 25)
    }
    if (Date.now() - this.player.chargingJumpTime >= this.player.maxJumpCharge * 0.625) {
      this.jumpChargingBar.fillStyle = 'yellow'
      this.jumpChargingBar.fillRect(25, 150 , 50, 25)
    }
    if (Date.now() - this.player.chargingJumpTime >= this.player.maxJumpCharge * 0.75) {
      this.jumpChargingBar.fillStyle = 'orange'
      this.jumpChargingBar.fillRect(25, 100 , 50, 25)
    }
    if (Date.now() - this.player.chargingJumpTime >= this.player.maxJumpCharge * 1) {
      this.jumpChargingBar.fillStyle = 'purple'
      this.jumpChargingBar.fillRect(25, 50 , 50, 25)
    } */
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
areYouSureMainMenu()  {
  document.getElementById('pauseMenu').style.display = "none"
  document.getElementById('goToMainMenu_ARE_YOU_SURE').style.display = "block"
}
openMainMenu()  {
  document.getElementById('goToMainMenu_ARE_YOU_SURE').style.display = "none"
  document.getElementById('mainMenu').style.display = "block"
}
continuePause() {
  document.getElementById('goToMainMenu_ARE_YOU_SURE').style.display = "none"
  document.getElementById('pauseMenu').style.display = " block"
}
  }

