import './style.css'
import Game from './src/classes/game.js';
import MenuManager from "./src/classes/menu/menu-manager.js";
import menusSelectors from "./src/data/menus.js";
import {menus} from "./src/data/menus.js";

const game = Game.getInstance()
// create and initialise MenuManger
const menuManager = new MenuManager(menusSelectors, menus)
menuManager.init()

function startGame() {
  document.getElementById('main-menu-background').style.display = "none"
  game.start(1);
}

function closePauseMenu() {
  console.log('false pressed')
  game._player.keys.pause.pressed = false
}

document.getElementById("main-menu-start-btn").onclick = startGame
document.getElementById("continue-btn").onclick = closePauseMenu
