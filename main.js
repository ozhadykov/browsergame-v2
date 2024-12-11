import './style.css'
import { Game } from "./classes/index.js";


const game = Game.getInstance()
const mainMenu = document.getElementById("main-menu");

function startGame() {
  document.getElementById('main-menu-backround').style.display = "none"
  game.canvas.style.display = "block";
  game.jumpChargingBarCanvas.style.display = "block"
  mainMenu.style.display = "none";
  game.start(1);
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
