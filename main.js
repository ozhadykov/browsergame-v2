import './style.css'
import Game from './src/classes/game.js';
import ScreenManager from "./src/classes/screens/screen-manager.js";
import {menus} from "./src/data/menus.js";

// create and initialise MenuManger
const menuManager = new ScreenManager(menus)
menuManager.init()
const game = Game.getInstance()

function startGame() {
  document.getElementById('main-menu-background').style.display = "none"
  game.start(1);
}

function closePauseMenu() {
  game._isPaused = false
  game.tick()
}

document.getElementById("main-menu-start-btn").onclick = startGame
document.getElementById("continue-btn").onclick = closePauseMenu
