// this class is a "helper" class
// Main goal is to divide Menus Logic from game Class
// because now we have only 3 menus, but if we want to have settings, sound settings
// and other menus, it will make Game class super messy
// here we can write logic on open and close of all menus

import {ScreenManager} from "../../base-classes/index.js";

class MenuManager {
  constructor(menusSelectors, menus) {
    // this._menus = []
    // menusSelectors.forEach((selector) => this._menus.push(new ScreenManager(selector)))
    this._menus = menus
  }

  init() {
    console.log('initialising')
    console.log(this._menus)

    // now we have to go through our objects
    // and set up all event listeners

    // first set up trigger keys
    this._menus.forEach(menu => menu.init())
  }

  // If we show a menu, we will always show one menu
  // so here we are hiding every menu and show only one
  // which selector is passed as param
  show(selector) {
    this._menus.forEach((menu) => menu.hide())
    this._menus.find(menu => menu.getSelector() === selector).show()
  }
}

export default MenuManager