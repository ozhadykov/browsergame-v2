import './style.css'
import Game from './src/classes/game.js';
import MenuManager from "./src/classes/menu-manager.js";
import menusSelectors from "./src/data/menus.js";
import {mainMenuSelector, areYouSureMenuSelector, pauseMenuSelector} from "./src/data/menu-constants.js";


const game = Game.getInstance()
// create and initialise MenuManger
const menuManager = new MenuManager(menusSelectors)
menuManager.init()

function startGame() {
  document.getElementById('main-menu-background').style.display = "none"
  game.getGameScreen().show()
  game.getChargingBar().show()
  game.getMainMenu().hide()
  game.start(1);
}

function closePauseMenu() {
  game.closePauseMenu()
  game._player.keys.pause.pressed = false
}

function areYouSureMainMenu() {
  game.areYouSureMainMenu()
  }

function goToMainMenu() {
  game.openMainMenu()
}

function continuePause()  {
  game.continuePause()
}



document.getElementById("main-menu-start-btn").onclick = startGame
document.getElementById("continue-btn").onclick = closePauseMenu
document.getElementById("go-to-main-menu").onclick = areYouSureMainMenu
document.getElementById("yes-main-menu").onclick = goToMainMenu
document.getElementById("no-continue-pause").onclick = continuePause
