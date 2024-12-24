// this class is a "helper" class
// Main goal is to divide Menus Logic from game Class
// because now we have only 3 menus, but if we want to have settings, sound settings
// and other menus, it will make Game class super messy
// here we can write logic on open and close of all menus

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
    this._menus.forEach(menu => {
      // get triggers from each menu
      const triggers = menu.getTriggers()

      // check if triggers are valid
      if (triggers.length > 0) {
        // loop through and set event listeners
        triggers.forEach(trigger => {
          if (trigger.getSelector().length > 0)
            document.querySelector(trigger.getSelector()).addEventListener(trigger.getEvtType(), () => {
              console.log('triggering', trigger.getEvtType())
              this.show(menu.getSelector())
            })
          else
            document.addEventListener(trigger.getEvtType(), (evt) => {
              if (evt.key === trigger.getEvtKey()) {
                console.log('triggering', trigger.getEvtType())
                this.show(menu.getSelector())
              }
            })
        })
      }
    })
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