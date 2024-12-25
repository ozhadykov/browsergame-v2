// this class is a "helper" class
// Main goal is to divide Menus Logic from game Class
// because now we have only 3 screens, but if we want to have settings, sound settings
// and other menus, it will make Game class super messy
// here we can write logic on open and close of all menus

class ScreenManager {
  constructor(screens) {
    this._screens = screens
  }

  init() {
    // now we have to go through our objects
    // and set up all event listeners
    // first set up trigger keys
    this._screens.forEach(screen => {
      // get triggers from each screen
      const triggers = screen.getTriggers()

      // check if triggers are valid
      if (triggers.length > 0) {
        // loop through and set event listeners
        triggers.forEach(trigger => {
          if (trigger.getSelector().length > 0)
            document.querySelector(trigger.getSelector())
              .addEventListener(trigger.getEvtType(), () => {
                this.show(screen.getSelector())
              })
          else
            document.addEventListener(trigger.getEvtType(), (evt) => {
              if (evt.key === trigger.getEvtKey()) {
                this.show(screen.getSelector())
              }
            })
        })
      }
    })
  }

  // If we show a screen, we will always show one screen
  // so here we are hiding every screen and show only one
  // which selector is passed as param
  show(selector) {
    this._screens.forEach((screen) => screen.hide())
    this._screens.find(screen => screen.getSelector() === selector).show()

    // show element itself
    const screenToShow = this._screens.find(screen => screen.getSelector() === selector)
    screenToShow.show()

    // show other elements which are supposed to be shown with it
    screenToShow.getShowWithArr().forEach(screenSelector => {
      // find Screen/Menu in all Menus
      const screenObj = this._screens.find(screen => screen.getSelector() === screenSelector)
      if (screenObj && !screenObj.isShown())
        screenObj.show()
    })
  }
}

export default ScreenManager