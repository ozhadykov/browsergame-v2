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

export const menus = [
  new Menu({
    selector: mainMenuSelector,
    name: 'Main menu',
    id: mainMenuSelector,
    background: '',
    triggers: [
      {selector: '#yes-main-menu', evtType: 'click'},
    ],
  }),
  new Menu({
    selector: pauseMenuSelector,
    name: 'Pause menu',
    id: pauseMenuSelector,
    background: '',
    triggers: [
      {selector: 'window', evtType: 'keydown', evtKey: 'Escape'},
      {selector: '#no-continue-pause', evtType: 'click'}
    ],
  }),
  new Menu({
    selector: areYouSureMenuSelector,
    name: 'Are You Sure',
    id: areYouSureMenuSelector,
    background: '',
    triggers: [
      {selector: '#go-to-main-menu', evtType: 'click'}
    ],
  })
]

const menusSelectors = [mainMenuSelector, pauseMenuSelector, areYouSureMenuSelector]

export default menusSelectors