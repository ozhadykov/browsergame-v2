import Player from "./player.js";
import ElementList from "./elementList.js";
import {generatePlatformsForLevel} from "../utils/PlatfromElementGenerator.js";
import {Background} from "./background.js";

export default class Game {

  static instance = null

  /**
   *
   * @param ctx
   * @param canvas
   * @param level
   */

  constructor(ctx, canvas, level = 0) {
    // using single tone to use in submodules
    if (Game.instance)
      return Game.instance

    // request animation frame handle
    this.raf = null
    this.canvas = canvas
    this.ctx = ctx
    this.elementList = null
    // not sure if we really need this here, ask prof.
    this.level = level
    this.player = null

    this.instance = this
  }

  static getInstance() {
    console.log(Game.instance)
    if (!Game.instance) {
      console.log('creating Game')
      const canvas = document.getElementById("my-canvas");
      const ctx = canvas.getContext("2d");
      Game.instance = new Game(ctx, canvas)
    }

    return Game.instance
  }

  start(level) {

    // creating element List
    this.elementList = new ElementList()

    this.player = new Player({
      position: {
        x: 100,
        y: 0
      },
      height: 32,
      width: 32,
    })

    // adding level markup
    this.background = new Background({
      position: {
        x: 0,
        y: 0
      }
    })
    const levelPlatforms = generatePlatformsForLevel(level)

    // adding all elements to List
    this.elementList.add(this.player)
    this.elementList.add(this.background)
    levelPlatforms.forEach(platform => this.elementList.add(platform))

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
      //this.ctx.scale(2, 2)
      //this.ctx.translate(0 , )

      //--- clear screen
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)

      // drawing elements
      this.elementList.draw(this.ctx, this.canvas)
      // animating
      this.elementList.action()

      // calling animation function again
      this.raf = window.requestAnimationFrame(this.tick.bind(this))
      this.ctx.restore()
    } else {
      this.openPauseMenu(this.canvas)
    }
  }

  openPauseMenu() {
    this.canvas.style.display = "none";
    document.getElementById('pauseMenu').style.display = "block"
  }

  closePauseMenu() {
    this.canvas.style.display = "block";
    document.getElementById('pauseMenu').style.display = "none"
    this.raf = window.requestAnimationFrame(this.tick.bind(this))
  }
  areYouSureMainMenu()  {
    document.getElementById('pauseMenu').style.display = "none"
    document.getElementById('goToMainMenu_ARE_YOU_SURE').style.display = "block"
  }
  openMainMenu()  {
    document.getElementById('goToMainMenu_ARE_YOU_SURE').style.display = "none"
    document.getElementById('main-menu').style.display = "block"
  }
  continuePause() {
    document.getElementById('goToMainMenu_ARE_YOU_SURE').style.display = "none"
    document.getElementById('pauseMenu').style.display = " block"
  }
}

