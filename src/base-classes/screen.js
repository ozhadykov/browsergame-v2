export class Screen {

  constructor({selector, background = '', triggers = [], showWithMe = []}) {
    this._selector = selector
    this._htmlEL = document.querySelector(this._selector)
    this._background = background
    this._triggers = triggers
    this._showWithMe = showWithMe
    this._shown = false
  }

  show() {
    if (this._htmlEL) {
      this._htmlEL.style.display = 'block'
      this._shown = true
    }
  }

  hide() {
    if (this._htmlEL) {
      this._htmlEL.style.display = 'none'
      this._shown = false
    }
  }

  getSelector() {
    return this._selector
  }

  getTriggers() {
    return this._triggers
  }

  isShown() {
    return this._shown
  }

}