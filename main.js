import './style.css'
import Game from './src/classes/game.js';
import ScreenManager from "./src/classes/screens/screen-manager.js";
import {screens} from "./src/data/screens.js";

// create and initialise MenuManger
const menuManager = new ScreenManager(screens)
menuManager.init()
const game = Game.getInstance()

document.getElementById("main-menu-start-btn")
  .addEventListener("click", () => game.start(1));
document.getElementById("continue-btn")
  .addEventListener("click", () => {
    game._isPaused = false
    game.tick()
  })
