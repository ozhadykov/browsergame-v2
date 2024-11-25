import Player from "./player.js";

export default class ElementList extends Array {

  constructor() {
    super()
  }

  /**
   *
   * @param element
   */
  add(element) {
    this.push(element)
  }

  get(i) {
    return this[i]
  }

  delete(i) {
    this.splice(i, 1)
  }

  /**
   *
   * @param ctx
   * @param canvas
   */
  draw(ctx, canvas) {
    for (let i = 0; i < this.length; i++) {
      this[i].draw(ctx, canvas)
    }
  }

  action() {
    for (let i = 0; i < this.length; i++) {
      this[i].action()
    }
  }

}