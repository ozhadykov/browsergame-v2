import {Screen} from "../../base-classes/index.js";


/*
* @id for each menu
* @selector html selector, mostly id
* @background for now may be just source for image
* @triggers for initialising event Listener
* @showWithMe[] array of selectors to be shown with picked menu in default: []
* */
class Menu extends Screen {

  constructor({selector, id, name, background, triggers, showWithMe}) {
    super({selector, background, triggers, showWithMe});
    this._id = id
    this._name = name
  }

  init() {
    // ... generate HTML
  }

}

export default Menu