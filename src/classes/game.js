import ElementList from "../base-classes/elementList.js";
import {levelsMeta} from "../data/levels.js";
import {Box, BaseElement, Screen} from "../base-classes/";
import {GameScreen} from "./screens/game-screen.js";
import {Level} from "./levels/level.js";
import Player2 from "./player.js";
import Goal from "./goal.js";
import {CameraBox} from "./boxes/camera-box.js";

export default class Game {

  static instance = null

  /**
   *
   * @param ctx
   * @param canvas
   */

  constructor(canvas, ctx) {
    // using single tone to use in submodules
    if (Game.instance)
      return Game.instance

    // request animation frame handle
    this.raf = null
    this.ctx = ctx
    this.canvas = canvas
    this.scaleX = 2
    this.scaleY = 4
    this.gameScreen = new GameScreen({selector: '#my-canvas'})
    this.elementList = null
    this._player = null
    this.goal = null
    this._level = null
    this._isPaused = false
    this._background = null
    this.cameraBox = new CameraBox({
      width: this.canvas.width / this.scaleX,
      height: this.canvas.height / this.scaleY
    })
    this.chargingBar = new GameScreen({selector: '#my-jump-charging-bar'})
    this.mainMenu = new Screen('#main-screens')

    document.addEventListener("keydown", (e) => {
      if (e.key === 'Escape')
        this._isPaused = true
    })
  }

  static getInstance() {
    if (!Game.instance) {
      const canvas = document.getElementById("my-canvas");
      const ctx = canvas.getContext("2d");

      Game.instance = new Game(canvas, ctx)
    }
    return Game.instance
  }

  start(levelId) {
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
          height: this.gameScreen.getCanvas().height * 3,
          width: this.gameScreen.getCanvas().width
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
      x: 250,
      y: 450,
      scale: 1,
      imageSrc: '../src/assets/goal/Goal.png',
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

    // this is important for animation purposes, do not need now
    this.timeOfLastFrame = Date.now()

    // here we are requiring window to reload to max framerate possible
    this.raf = window.requestAnimationFrame(this.tick.bind(this))

  }

  stop() {
    window.cancelAnimationFrame(this.raf)
  }

  tick() {
    if (!this._isPaused && !this.goal.checkForGoalReached(this._player)) {
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

      this.cameraBox.updateHorizontalCamera(this._player.getHitBox())
      this.cameraBox.updateVerticalCamera(this._player.getHitBox())

      this.ctx.translate(
        -this.cameraBox.getX(),
        -this.cameraBox.getY())

      // drawing elements
      this.elementList.draw(this.ctx, this.gameScreen.getCanvas())

      // animating
      this.elementList.action()
      if (this._player.keys.w.pressed) {
        this.drawjumpChargingBar()
      }

      this.ctx.restore()
    } else {
      if (this.goal.checkForGoalReached(this._player)) {
        this.mainMenu.show()
      }
      this.stop()
      return
    }
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

  getGameScreen() {
    return this.gameScreen
  }

}

