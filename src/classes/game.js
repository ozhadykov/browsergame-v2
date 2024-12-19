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
    this.instance = this
    this.scale = 2
    this.gameScreen = new GameScreen('#my-canvas')
    this.elementList = null
    this.player = null
    this.levelId = 0// Initialize level id // 
    this.transitioning = false
    this.goal = null
    this.level = new Level({
      levelId,
      levelString: levels.at(levelId),
      background: new BaseElement({
        x: 0,
        y: 0,
        imageSrc: `../src/assets/background/Backround_komplett.png`,
        imageCropBox: new Box({
          height: this.gameScreen.getCanvas().height * 7,
          width: this.gameScreen.getCanvas().width * 2
        }),
        framesX: 1,
        framesY: 1
      })
    })
    this.background = this.level.getBackground()
    this.cameraBox = new CameraBox({
      width: this.canvas.width / this.scale,
      height: this.canvas.height / this.scale
    })
    this.chargingBar = new GameScreen('#my-jump-charging-bar')
    this.pauseMenu = new ScreenManager('#pause-menu')
    this.mainMenu = new ScreenManager('#main-menu')
    this.areYouSureMenu = new ScreenManager('#are-you-sure-menu')

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
    this.elementList = new ElementList()

    // creating game elements
    // generating platform blocks
    let platformBlocks = this.level.generatePlatfroms()

    this.player = new Player2({
      x: 0,
      y: 440 / 6,
      scale: 0.3,
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
    this.elementList.add(this.background)
    this.elementList.add(this.player)
    this.elementList.add(this.goal)
    platformBlocks.forEach(platform => this.elementList.add(platform))

    // this is important for animation purposes, do not need now
    this.timeOfLastFrame = Date.now()

    // here we are requiring window to reload to max framerate possible
    this.raf = window.requestAnimationFrame(this.tick.bind(this))

  }

  nextLevel() {
    //speichere Position
    const posX = this.player.getX()
    const direction = this.player.getDirection()
    const nextLevelId = (this.level.getLevelId() + 1) % levels.length;

    // Setze das nächste Level
    this.level = new Level({
      levelId: nextLevelId, levelString: levels.at(nextLevelId),
      background: new BaseElement({
        x: 0, y: 0,
        imageSrc: `../src/assets/background/Background_Level_${nextLevelId}.png`,
        imageCropBox: new Box({
          y: 5, height: this.gameScreen.getCanvas().height,
          width: this.gameScreen.getCanvas().width
        }),
        framesX: 1,
        framesY: 1
      })
    })
    this.background = this.level.getBackground()

    // generating platform blocks
    let platformBlocks = this.level.generatePlatfroms()

    this.player = new Player2({
      x: posX,
      y: 510, // Spielerposition anpassen
      scale: 0.4,
      imageSrc: '../src/assets/Char/CharSheetWalk.png',
      imageCropBox: new Box({
        x: 0,
        y: 100,
        height: 99,
        width: 100
      }),
      platformBlocks,
      framesX: 9,
      framesY: 3
    })

    this.elementList.clear(); // Leert die Liste der Elemente
    this.elementList.add(this.background)
    platformBlocks.forEach(platform => this.elementList.add(platform))
    this.player.setDirection(direction)
    this.elementList.add(this.player)

  }

  previousLevel() {
    //speichere Position
    const posX = this.player.getX()
    const direction = this.player.getDirection()
    const prevLevelId = (this.level.getLevelId() - 1)
    // if (prevLevelId<0) {this.prevLevelId = 0}
    console.log(`Current level ID: ${this.level.getLevelId()}`);
    console.log(`Prev level ID: ${prevLevelId}`)
    // Setze das vorherige Level
    this.level = new Level({
      levelId: prevLevelId, levelString: levels.at(prevLevelId),
      background: new BaseElement({
        x: 0, y: 0, imageSrc: `../src/assets/background/Background_Level_${prevLevelId}.png`,
        imageCropBox: new Box({
          y: 5, height: this.gameScreen.getCanvas().height,
          width: this.gameScreen.getCanvas().width
        }),
        framesX: 1,
        framesY: 1
      })
    });

    this.background = this.level.getBackground();

    // generating platform blocks
    let platformBlocks = this.level.generatePlatfroms()

    this.player = new Player2({
      x: posX,
      y: 0, // Spielerposition anpassen
      scale: 0.4,
      imageSrc: '../src/assets/Char/CharSheetWalk.png',
      imageCropBox: new Box({
        x: 0,
        y: 100,
        height: 99,
        width: 100
      }),
      platformBlocks,
      framesX: 9,
      framesY: 3
    })

    this.elementList.clear(); // Leert die Liste der Elemente
    this.elementList.add(this.background)
    platformBlocks.forEach(platform => this.elementList.add(platform))
    this.player.setDirection(direction)
    this.elementList.add(this.player)

  }


  stop() {
    window.cancelAnimationFrame(this.raf)
  }

  tick() {
    if (!this.player.keys.pause.pressed && !this.goal.checkForGoalReached(this.player)) {
      this.ctx.save()

      //finde das kleinere besser aber nur mein geschmack. Falls geändert müssen wir auch den Sprung entsprechend anpassen
      this.ctx.scale(2, 6)

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


      // // Check for level transitions
      // if (this.player.getY() < 50 && this.player.canJump) {
      //   this.nextLevel();
      // } else if (this.player.getY() > 539) {
      //   this.previousLevel();
      // }


      // calling animation function again
      this.raf = window.requestAnimationFrame(this.tick.bind(this))
      this.ctx.restore()
    } else {
      if (this.goal.checkForGoalReached(this.player)) {
        this.gameScreen.hide()
        this.chargingBar.hide()
        this.mainMenu.show()
      } else
        // open pause menu and hiding elements
        this.pauseMenu.show()
      this.gameScreen.hide()
      this.chargingBar.hide()
    }
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

  getMapScale() {
    return this.scale
  }

  closePauseMenu() {
    this.gameScreen.show()
    this.chargingBar.show()
    this.pauseMenu.hide()
    // why? i did not understand (c) Omar :) would like to know more
    this.raf = window.requestAnimationFrame(this.tick.bind(this))
  }

  areYouSureMainMenu() {
    this.pauseMenu.hide()
    this.areYouSureMenu.show()
  }

  openMainMenu() {
    this.areYouSureMenu.hide()
    this.mainMenu.show()
  }

  continuePause() {
    this.areYouSureMenu.hide()
    this.pauseMenu.show()
  }
}

