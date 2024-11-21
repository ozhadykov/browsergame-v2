import './style.css'
import {Game} from "./classes/index.js";


const game = Game.getInstance()
const mainMenu = document.getElementById("main-menu");

function goToMainMenu() {
  game.canvas.style.display = "block";
  mainMenu.style.display = "none";
  game.start(0);
}

function closePauseMenu() {
  game.closePauseMenu()
  game.player.keys.pause.pressed = false
}

document.getElementById("start-button").onclick = goToMainMenu
document.getElementById("continueButton").onclick = closePauseMenu
