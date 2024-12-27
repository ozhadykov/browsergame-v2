import {Screen} from "../../base-classes/index.js";

// this screen will be used when you choose level
// and then have the opportunity to read about this level
// maybe get the best result or something and then start level
class LevelInfo extends Screen{

  constructor({selector, id, name, backgroundSelector, triggers, showWithMe}) {
    super({selector, backgroundSelector, triggers, showWithMe});
    this._id = id
    this._name = name
  }

  init() {
    // ... generate HTML
  }
}

export default LevelInfo