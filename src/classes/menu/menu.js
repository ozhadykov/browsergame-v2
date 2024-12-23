import {ScreenManager} from "../../base-classes/index.js";


/*
* @id for each menu
* @selector html selector, mostly id
* @background for now may be just source for image
* @triggerKey for initialising event Listener
* @showWithMe[] array of selectors to be shown with picked menu in default: []
* */
class Menu extends ScreenManager {

  constructor({selector, id, name, background, triggers, showWithMe = []}) {
    super(selector)
    this._id = id
    this._name = name
    this._background = background
    this._triggers = triggers
    this._showWithMe = showWithMe
  }

  init () {
    this._triggers.forEach(trigger => {
      console.log(trigger)
      document.querySelector(this._selector).addEventListener(trigger.evtType, (e) => {
        console.log('triggering', e)
      })
    })
  }
}

export default Menu