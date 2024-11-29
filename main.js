import './style.css'
import { Game } from "./classes/index.js";


const game = Game.getInstance()
const mainMenu = document.getElementById("mainMenu");

function startGame() {
  document.getElementById('mainmenuBackround').style.display = "none"
  game.canvas.style.display = "block";
  mainMenu.style.display = "none";
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



document.getElementById("mainMenuStartButton").onclick = startGame
document.getElementById("continueButton").onclick = closePauseMenu
document.getElementById("goToMainMenu").onclick = areYouSureMainMenu
document.getElementById("YesMainMenu").onclick = goToMainMenu
document.getElementById("NoContinuePause").onclick = continuePause
