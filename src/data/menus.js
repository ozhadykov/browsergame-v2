// Menus is an array for menus
// We will store here different menus, which we will need in game
// also this is very useful if we have multiple menus

// each menu will have own id, it should be same with an id in html
// if you want to add a menu, you just have to add one more element here
// "best practice" create a constant in menu-constants.js and then add it here
// "you can do it" write a string inside 'my-id'

// each menu needs id
// key, to trigger event, for example help menu or pause
// optionally background
// array of menu selectors, which should be shown also with picked menu
// object with routes
// each property of this object is like a key -> value
// on the left is the html selector of your button
// on the right is the selector of next menu or action, from menu-actions.js

import {mainMenuSelector, pauseMenuSelector, areYouSureMenuSelector} from "./menu-constants.js"
import Menu from "../classes/menu/menu.js";
import ScreenTrigger from "../classes/menu/screen-trigger.js";
import {GameScreen} from "../classes/game-screen.js";

export const menus = [
  new Menu({
    selector: mainMenuSelector,
    name: 'Main menu',
    id: mainMenuSelector,
    background: '',
    triggers: [
      new ScreenTrigger({selector: '#yes-main-menu', evtType: 'click'})
    ],
  }),
  new Menu({
    selector: pauseMenuSelector,
    name: 'Pause menu',
    id: pauseMenuSelector,
    background: '',
    triggers: [
      new ScreenTrigger({evtType: 'keydown', evtKey: 'Escape'}),
      new ScreenTrigger({evtType: 'click', selector: '#no-continue-pause'}),
    ],
  }),
  new Menu({
    selector: areYouSureMenuSelector,
    name: 'Are You Sure',
    id: areYouSureMenuSelector,
    background: '',
    triggers: [
      new ScreenTrigger({selector: '#go-to-main-menu', evtType: 'click'})
    ],
  }),
  new GameScreen({
    selector: '#my-canvas',
    name: 'My Canvas',
    id: 'my-canvas',
    triggers: [
      new ScreenTrigger({selector: '#main-menu-start-btn', evtType: 'click'}),
      new ScreenTrigger({selector: '#continue-btn', evtType: 'click'})
    ]
  }),
  new GameScreen({
    selector: '#my-jump-charging-bar',
    name: 'Jump Charging',
    id: 'my-jump-charging-bar',
    triggers: [
      new ScreenTrigger({selector: '#main-menu-start-btn', evtType: 'click'}),
      new ScreenTrigger({selector: '#continue-btn', evtType: 'click'})
    ]
  })
]

const menusSelectors = [mainMenuSelector, pauseMenuSelector, areYouSureMenuSelector]

export default menusSelectors