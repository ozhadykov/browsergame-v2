import ElementList from "../base-classes/elementList.js";
import {levels} from "../data/levels.js";
import {Box, BaseElement, ScreenManager} from "../base-classes/";
import {GameScreen} from "./canvas-manager.js";
import {Level} from "./level.js";
import Player2 from "./player.js";
import Goal from "./goal.js";
import {CameraBox} from "./camera-box.js";

export default class Game {

  static instance = null

  /**
   *
   * @param ctx
   * @param canvas
   * @param levelId
   */

  constructor(canvas, ctx, levelId = 0) {
    // using single tone to use in submodules
    if (Game.instance)
      return Game.instance

    // request animation frame handle
    this.raf = null
    this.ctx = ctx
    this.canvas = canvas
    this.scaleX = 2
    this.scaleY = 4
    this.gameScreen = new GameScreen('#my-canvas', true, 'gameFrame')
    this.elementList = null
    this.player = null
    this.goal = null
    this.level = new Level({
      levelId,
      levelString: levels.at(levelId),
      background: new BaseElement({
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        imageSrc: `../src/assets/background/Halle.png`,
        imageCropBox: new Box({
          height: this.gameScreen.getCanvas().height * 3,
          width: this.gameScreen.getCanvas().width
        }),
        framesX: 1,
        framesY: 1
      })
    })
    this.background = this.level.getBackground()
    this.cameraBox = new CameraBox({
      width: this.canvas.width / this.scaleX,
      height: this.canvas.height / this.scaleY
    })
    this.chargingBar = new GameScreen('#my-jump-charging-bar')
    this.pauseMenu = new ScreenManager('#pause-menu')
    this.mainMenu = new ScreenManager('#main-menu')
    this.areYouSureMenu = new ScreenManager('#are-you-sure-menu')
    this.tutorialMenu = new ScreenManager('#tutorial-menu')

    //Timer:
    this.time = 0; 
    this.timerRunning = false; 
    this.intervalId = null; 
  }

  startTimer() {
    if (!this.timerRunning) {
      this.timerRunning = true; 
      this.intervalId = setInterval(() => {
        if (this.timerRunning) {
          this.time++;
          console.log(`Time: ${this.time}`); // Optional: Log time for testing
        }
      }, 1000); // 1-second interval
    }
  }

  stopTimer() {
    if (this.timerRunning) {
      this.timerRunning = false; 
      clearInterval(this.intervalId); 
      this.intervalId = null; // Clear the interval ID
    }
  }

  resetTimer() {
    this.stopTimer(); 
    this.time = 0; 
    console.log("Timer reset."); // Optional: Log reset
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60); // Ganze Minuten
    const remainingSeconds = seconds % 60; // Übrige Sekunden
    return `${minutes} : ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`; 
  }
  

  static getInstance() {
    if (!Game.instance) {
      const canvas = document.getElementById("my-canvas");
      const ctx = canvas.getContext("2d");

      Game.instance = new Game(canvas, ctx, 0) // start mit Level 0
    }
    return Game.instance
  }

  start() {
    this.startTimer()
    this.elementList = new ElementList()

    // creating game elements
    // generating platform blocks
    const platformBlocks = this.level.generatePlatfroms()

    this.player = new Player2({
      x: 0,
      y: 1600,
      scale: 0.3,
      scaleY: 5,
      scaleX: 2,
      imageSrc: '../src/assets/Char/CharSheetWalk.png',
      imageCropBox: new Box({
        x: 0,
        y: 0,
        height: 99,
        width: 100
      }),
      platformBlocks,
      framesX: 9,
      framesY: 3
    })

    this.goal = new Goal({
      x: 50,
      y: 5,
      imageSrc: '../src/assets/goal/goal.png',
      imageCropBox: new Box({
        x: 0,
        y: 0,
        height: 32,
        width: 32
      }),
      framesX: 1,
      framesY: 1
    })

    // adding all elements to List
    this.elementList.add(this.background)
    this.elementList.add(this.player)
    this.elementList.add(this.goal)
    platformBlocks.forEach(platform => this.elementList.add(platform))

    // this is important for animation purposes, do not need now
    this.timeOfLastFrame = Date.now()

    // here we are requiring window to reload to max framerate possible
    this.raf = window.requestAnimationFrame(this.tick.bind(this))

  }

  stop() {
    this.stopTimer()
    window.cancelAnimationFrame(this.raf)
  }

  
  tick() {
    this.gameScreen.updateFrame()
    if (!this.player.keys.pause.pressed && !this.goal.checkForGoalReached(this.player)) {
      this.ctx.save()
      this.ctx.scale(this.scaleX, this.scaleY)

      //--- clear screen
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(0, 0, this.gameScreen.getCanvas().clientWidth, this.gameScreen.getCanvas().clientHeight)

      const jumpChargingBarCtx = this.chargingBar.getContext()
      const jumpChargingBarCanvas = this.chargingBar.getCanvas()
      jumpChargingBarCtx.fillStyle = 'white'
      jumpChargingBarCtx.fillRect(0, 0,
        jumpChargingBarCanvas.clientWidth,
        jumpChargingBarCanvas.clientHeight)

      this.cameraBox.updateHorizontalCamera(this.player.getHitBox())
      this.cameraBox.updateVerticalCamera(this.player.getHitBox())

      this.ctx.translate(
        -this.cameraBox.getX(),
        -this.cameraBox.getY())

      // drawing elements
      this.elementList.draw(this.ctx, this.gameScreen.getCanvas())

      // animating
      this.elementList.action()
      if (this.player.keys.w.pressed) {
        this.drawjumpChargingBar()
      }

      // calling animation function again
      this.raf = window.requestAnimationFrame(this.tick.bind(this))
      this.ctx.restore()
    } else {
      if (this.goal.checkForGoalReached(this.player)) {
        //show time in end screen
        this.resetTimer()
        this.gameScreen.hide()
        this.gameScreen.hideFrame()
        this.chargingBar.hide()
         this.ctx.font = "20px Arial";
       this.ctx.fillText(this.time,900,30)
       this.ctx.beginPath()
       this.mainMenu.show()
             } 
              else{
        // open pause menu and hiding elements
      this.stopTimer()
      this.pauseMenu.show()
      this.gameScreen.show()

      }

      this.gameScreen.displayFrame()
      this.chargingBar.show()

    }

    //timer:
    this.ctx.font = "20px Arial";
    this.ctx.fillText(this.formatTime(this.time),900,30);
  }

  drawjumpChargingBar() {
    for (let i = 0; i <= this.player.maxJumpCharge; i += this.player.maxJumpCharge / 10) { // auch mit /20; /100 möglich
      if (Date.now() - this.player.chargingJumpTime >= i) {
        const charginBarCanvas = this.chargingBar.getCanvas()
        const charginBarCtx = this.chargingBar.getContext()

        charginBarCtx.fillStyle = `rgb(${(255 - i / 5)},0 , 0)`
        charginBarCtx.fillRect(0,
          charginBarCanvas.clientHeight - charginBarCanvas.clientHeight * (i / this.player.maxJumpCharge),
          charginBarCanvas.clientWidth, charginBarCanvas.clientHeight / 10)
      }
    }
  }

  getGameScreen() {
    return this.gameScreen
  }

  getChargingBar() {
    return this.chargingBar
  }

  getMainMenu() {
    return this.mainMenu
  }
  getTutorial() {
    return this.tutorialMenu
  }

  getMapScale() {
    return this.scale
  }

  closePauseMenu() {
    this.startTimer()
    this.gameScreen.show()
    this.gameScreen.displayFrame()
    this.chargingBar.show()
    this.pauseMenu.hide()
    this.raf = window.requestAnimationFrame(this.tick.bind(this))
  }

  areYouSureMainMenu() {
    this.pauseMenu.hide()
    this.areYouSureMenu.show()
  }

  openMainMenu() {
    this.stopTimer()
    this.resetTimer()
    this.areYouSureMenu.hide()
    this.gameScreen.hide()
    this.mainMenu.show()
  }

  continuePause() {
    this.areYouSureMenu.hide()
    this.pauseMenu.show()
  }
}

