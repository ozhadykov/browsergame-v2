import Player from "./player.js";
import ElementList from "./elementList.js";
import {generatePlatformsForLevel} from "../utils/PlatfromElementGenerator.js";

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

    //fill all elements in element List:
    this.elementList = new ElementList()

    // adding player to element list
    this.elementList.add(new Player({
      position: {
        x: 100,
        y: 0
      },
      height: 50,
      width: 50,
    }))

    this.player = this.elementList.getPlayer()

    // adding level markup
    const levelPlatforms = generatePlatformsForLevel(level)
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
      //--- clear screen
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)

      // drawing elements
      this.elementList.draw(this.ctx, this.canvas)
      // animating
      this.elementList.action()

      // calling animation function again
      this.raf = window.requestAnimationFrame(this.tick.bind(this))
    } else {
      this.openPauseMenu(this.canvas)
    }
  }

  openPauseMenu() {
    this.canvas.style.display = "none";
    document.getElementById('pauseMenu').style.display = 'block';
  }

  closePauseMenu() {
    this.canvas.style.display = "block";
    document.getElementById('pauseMenu').style.display = 'none';
    this.raf = window.requestAnimationFrame(this.tick.bind(this))
  }
}

