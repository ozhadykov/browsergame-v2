import ElementList from "../base-classes/elementList.js";
import {levelsMeta} from "../data/levels.js";
import {Box, BaseElement, Screen} from "../base-classes/";
import {GameScreen} from "./screens/game-screen.js";
import {Level} from "./levels/level.js";
import Player2 from "./player.js";
import Goal from "./goal.js";
import {CameraBox} from "./boxes/camera-box.js";
import {Sound} from "../base-classes/sound.js";


export default class Game {

  static instance = null

  /**
   *
   * @param ctx
   * @param canvas
   * @param triggers
   * @param screenManager
   */

  constructor({canvas, ctx, triggers, screenManager}) {
    // using single tone to use in submodules
    if (Game.instance)
      return Game.instance

    // request animation frame handle
    this.raf = null
    this.ctx = ctx
    this.canvas = canvas
    this._triggers = triggers
    this.scaleX = 2
    this.scaleY = 4
    this.elementList = null
    this._player = null
    this.goal = null
    this._level = null
    this._isPaused = true
    this._background = null
    this.sound = new Sound("#sound");
    this.sound.initSound("winSound", "../src/assets/Sounds/winSound.mp3");
    this.sound.setVol();
    this.cameraBox = new CameraBox({
      width: this.canvas.width / this.scaleX,
      height: this.canvas.height / this.scaleY
    })
    this._screenManager = screenManager
    this.chargingBar = new GameScreen({selector: '#my-jump-charging-bar'})

    // listening to escape, so that we could be independent of screen manager
    //  and the game could control only its own logic
    document.addEventListener("keydown", (e) => {
      if (e.key === 'Escape')
        this._isPaused = true
    })

    // listening to triggers.
    // we want to define if this is a resume game or start level
    this.initResumeOrPauseTriggers()

    //Timer:

    this.time = 0;
    this.timerRunning = false;
    this.intervalId = null;

    Game.instance = this
  }

  startTimer() {
    if (!this.timerRunning) {
      this.timerRunning = true;
      this.intervalId = setInterval(() => {
        if (this.timerRunning) {
          this.time++;
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

      Game.instance = new Game({canvas, ctx})
    }
    return Game.instance
  }

  start(levelId) {
    this.startTimer()
    this.elementList = new ElementList()
    this._isPaused = false
    // creating game elements

    // generating Level
    const levelMeta = levelsMeta.find(level => level.getLevelId() === levelId)
    this._level = new Level({
      levelId: levelMeta.getLevelId(),
      levelString: levelMeta.getLevelMarkup(),
      background: new BaseElement({
        imageSrc: levelMeta.getBackgroundImgSrc(),
        imageCropBox: new Box({
          height: this.canvas.height * 3,
          width: this.canvas.width
        }),
      })
    })

    // generating background
    this._background = this._level.getBackground()

    // generating platform blocks
    const platformBlocks = this._level.generatePlatfroms()

    // creating player
    this._player = new Player2({
      x: levelMeta.getPlayerStartPositionX(),
      y: levelMeta.getPlayerStartPositionY(),
      scaleY: levelMeta.getPlayerScaleY(),
      scaleX: levelMeta.getPlayerScaleX(),

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

    // creating goal
    this.goal = new Goal({
      x: 100,
      y: 20,
      scale: 1,
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
    this.elementList.add(this._background)
    this.elementList.add(this._player)
    this.elementList.add(this.goal)
    platformBlocks.forEach(platform => this.elementList.add(platform))

    // here we are requiring window to reload to max framerate possible
    this.raf = window.requestAnimationFrame(this.tick.bind(this))

  }

  stop() {
    this.stopTimer()
    window.cancelAnimationFrame(this.raf)
  }


  tick() {
    if (!this._isPaused && !this.goal.checkForGoalReached(this._player)) {

      this.ctx.save()
      this.ctx.scale(this.scaleX, this.scaleY)

      //--- clear screen
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)

      const jumpChargingBarCtx = this.chargingBar.getContext()
      const jumpChargingBarCanvas = this.chargingBar.getCanvas()
      jumpChargingBarCtx.fillStyle = 'white'
      jumpChargingBarCtx.fillRect(0, 0,
        jumpChargingBarCanvas.clientWidth,
        jumpChargingBarCanvas.clientHeight)

      this.cameraBox.updateHorizontalCamera(this._player.getHitBox())
      this.cameraBox.updateVerticalCamera(this._player.getHitBox())

      this.ctx.translate(
        -this.cameraBox.getX(),
        -this.cameraBox.getY())

      // drawing elements
      this.elementList.draw(this.ctx, this.canvas)

      // animating
      this.elementList.action()
      if (this._player.keys.w.pressed) {
        this.drawjumpChargingBar()
      }

      this.ctx.restore()
    } else {
      if (this.goal.checkForGoalReached(this._player)) {
        //show time in end screen
        this.resetTimer()
        this.sound.setVol()
        this.sound.playSound("winSound", 4)
        this.ctx.font = "20px Arial";
        this.ctx.fillText(this.time, 900, 30)
        this.ctx.beginPath()
        this._screenManager.show('#main-menu')
      }

      this.stop()
      return
    }

    //timer:
    this.ctx.font = "20px Arial";
    this.ctx.fillText(this.formatTime(this.time), 900, 30);

    // calling animation function again
    this.raf = window.requestAnimationFrame(this.tick.bind(this))
  }

  drawjumpChargingBar() {
    for (let i = 0; i <= this._player.maxJumpCharge; i += this._player.maxJumpCharge / 10) { // auch mit /20; /100 möglich
      if (Date.now() - this._player.chargingJumpTime >= i) {
        const charginBarCanvas = this.chargingBar.getCanvas()
        const charginBarCtx = this.chargingBar.getContext()

        charginBarCtx.fillStyle = `rgb(${(255 - i / 5)},0 , 0)`
        charginBarCtx.fillRect(0,
          charginBarCanvas.clientHeight - charginBarCanvas.clientHeight * (i / this._player.maxJumpCharge),
          charginBarCanvas.clientWidth, charginBarCanvas.clientHeight / 10)
      }
    }
  }

  getCanvas() {
    return this.canvas
  }

  isPaused() {
    return this._isPaused
  }

  resume() {
    this._isPaused = false
    this.tick()
  }

  initResumeOrPauseTriggers() {
    this._triggers.forEach(trigger => {
      const triggerEl = document.querySelector(trigger)
      triggerEl.addEventListener('click', () => {
        // check dataset value
        const levelId = triggerEl.dataset.levelId
        if (levelId) {
          if (levelId === 'continue')
            // if it is "continue", then resume
            this.resume()
          else
            // if not, start another level
            this.start(levelId)
        }
      })
    })
  }
}

