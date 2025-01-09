import './style.css'
import Game from './src/classes/game.js';
import ScreenManager from "./src/classes/screens/screen-manager.js";
import {screens} from "./src/data/screens.js"

// get canvas and context
const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

// create level Preview screens from levels.js
// create Choose Level Screen 
// add triggers from Level Prview screens in choose level screen
// create new array with screens.js, choose Level and level preview screens

// create and initialise MenuManger in init function menu manager attaches html from menus
const screenManager = new ScreenManager(screens)
screenManager.init()

// also need to dynamically generate all menus from levels.js and push them into Menu manager
// level-preview-screen and choose Level (simple menu with btns)
// add button to go back

// idea: dynamically create triggers for start game function and also generate ScreenTriggers for screens.js (my-canvas and charging bar)
// first step is: get triggers, now hardcoded
// each trigger is a html button with data attribute, which contains inside level id
// our level ids are from 1 to infinity :)
// also we can store in data attribute text, so if in data attribute inside text
// 'continue', it means, that we are in pause menu or similar and can just call resumeFromMenu
const triggers = ['#main-menu-start-btn', '#continue-btn', '#start-level-1', '#start-level-2', '#start-level-3']
const game = new Game({canvas, ctx, triggers, screenManager})

