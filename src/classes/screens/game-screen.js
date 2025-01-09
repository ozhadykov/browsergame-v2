import {Screen} from "../../base-classes/index.js";

export class GameScreen extends Screen {

  /**
   * @param selector this should be a selector for a querySelector method
   * @param triggers[]
   * @param background
   * @param showWithMe[]
   */
  constructor({selector, triggers, backgroundSelector, showWithMe, hasFrame, frameID}) {
    super({selector, triggers, backgroundSelector, showWithMe})
    this._hasFrame = hasFrame ?? false
    this._frameID = frameID ?? null
    this._ctx = this._htmlEL.getContext("2d")
  }

  hideFrame() {
    if (this._hasFrame) {
      if (this._frameID) {
        let gameFrame = document.getElementById(this._frameID)
        if (gameFrame) {
          gameFrame.style.display = 'none'
        } else {
          throw new Error(`gameFrame with id ${this._frameID} not found`)
        }
      } else {
        throw new Error('frameID not set')
      }
    }
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