import {Screen} from "../../base-classes/index.js";

class GameFrameScreen extends Screen {
  /**
   * @param selector this should be a selector for a querySelector method
   * @param triggers[]
   * @param background
   * @param showWithMe[]
   */
  constructor({selector, triggers, backgroundSelector, showWithMe}) {
    super({selector, triggers, backgroundSelector, showWithMe})
  }

  show() {
    const gameCanvas = document.getElementById('my-canvas')
    const canvasRect = gameCanvas.getBoundingClientRect();
    this._htmlEL.style.top = `${canvasRect.top - 1166}px`;
    this._htmlEL.style.left = `${canvasRect.left - 81}px`;
    this._htmlEL.style.width = `${canvasRect.width + 314}px`;
    this._htmlEL.style.height = `${canvasRect.height + 1260}px`;
    super.show();
  }

}

export default GameFrameScreen