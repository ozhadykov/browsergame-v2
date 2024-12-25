import {Screen} from "../../base-classes/index.js";

/*
* @id for each screen
* @selector html selector, mostly id
* @background for now may be just source for image
* @triggers for initialising event Listener
* @showWithMe[] array of selectors to be shown with picked screens in default: []
* */
class MenuScreen extends Screen {

  constructor({selector, id, name, backgroundSelector, triggers, showWithMe}) {
    super({selector, backgroundSelector, triggers, showWithMe});
    this._id = id
    this._name = name
  }

  init() {
    // ... generate HTML
  }

}

export default MenuScreen