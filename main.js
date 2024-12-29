import './style.css'
import Game from './src/classes/game.js';


const game = Game.getInstance()
const mainMenu = document.getElementById("main-menu");

function startGame() {
  document.getElementById('main-menu-backround').style.display = "none"
  game.getGameScreen().show()
  game.getGameScreen().displayFrame()
  game.getChargingBar().show()
  game.getMainMenu().hide()
  game.start(0);
}

function closePauseMenu() {
  game.closePauseMenu()
  game.player.keys.pause.pressed = false
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
