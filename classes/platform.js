import BaseGameElement from "./element.js";

export class Platform extends BaseGameElement {

  constructor(params) {
    super(params)
    this.width = 30
    this.height = 30
  }

  update() {

  }

  draw(ctx) {
    if (!ctx) {
      console.error('ctx is undefined');
      return // oder Fehler
    }
    ctx.fillStyle = 'rgba(1, 14, 14, 1)'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

