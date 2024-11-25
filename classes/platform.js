import BaseGameElement from "./element.js";

export class Platform extends BaseGameElement {

  constructor(params) {
    super(params)
    this.height = params.height
    this.width = params.width
  }

  update() {

  }


}

