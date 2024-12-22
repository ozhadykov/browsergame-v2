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

import {mainMenuSelector, pauseMenuSelector, areYouSureMenuSelector} from "./menu-constants.js"

const menusSelectors = [mainMenuSelector, pauseMenuSelector, areYouSureMenuSelector]

export default menusSelectors