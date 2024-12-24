import {Screen} from "../base-classes";

export class GameScreen extends Screen {

  /**
   * @param selector this should be a selector for a querySelector method
   * @param triggers
   * @param background
   */
  constructor({selector, triggers, background}) {
    super({selector, triggers, background})
    this._ctx = this._htmlEL.getContext("2d")
  }

  getCanvas() {
    if (this._htmlEL)
      return this._htmlEL
    else
      throw new Error(`selector ${this._selector} is invalid, html element not found`)
  }

  getContext() {
    if (this._ctx)
      return this._ctx
    else
      throw new Error('Context for canvas not found')
  }

  getCanvasWidth() {
    if (this._htmlEL)
      return this._htmlEL.width

    return 0
  }

  getCanvasHeight() {
    if (this._htmlEL)
      return this._htmlEL.height
    return 0
  }
}