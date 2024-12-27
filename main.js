import './style.css'
import Game from './src/classes/game.js';
import ScreenManager from "./src/classes/screens/screen-manager.js";
import {screens} from "./src/data/screens.js";

// get canvas and context
const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

// create and initialise MenuManger
const menuManager = new ScreenManager(screens)
menuManager.init()

// also need to dynamically generate all menus from levels.js and push them into Menu manager
// level-preview-screen and choose Level (simple menu with btns)
// add button to go back

// idea: dynamically create triggers for start game function
// first step get triggers, now hardcoded
// each trigger is a html button with data attribute, which contains inside level id
// our level ids are from 1 to infinity :)
// also we can store in data attribute text, so if in data attribute inside text
// 'continue', it means, that we are in pause menu or similar and can just call resumeFromMenu
const triggers = ['#main-menu-start-btn', '#continue-btn']
const game = new Game({canvas, ctx, triggers})
// const game = Game.getInstance()

document.getElementById("main-menu-start-btn")
  .addEventListener("click", () => game.start(1));

document.getElementById("continue-btn")
  .addEventListener("click", () => {
    game._isPaused = false
    game.tick()
  })
