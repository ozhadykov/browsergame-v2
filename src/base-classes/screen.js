export class Screen {

  constructor({selector, backgroundSelector = '', triggers = [], showWithMe = []}) {
    this._selector = selector
    this._htmlEL = document.querySelector(this._selector)
    if (backgroundSelector.length > 0)
      this._background = document.querySelector(backgroundSelector)
    this._triggers = triggers
    this._showWithMe = showWithMe
    this._shown = false
    this._initialised = false
  }

  show() {
    if (this._htmlEL) {
      this._htmlEL.classList.remove('d-none')
      this._shown = true
    }
    if (this._background)
      this._background.style.display = 'block'
  }

  hide() {
    if (this._htmlEL) {
      this._htmlEL.classList.add('d-none')

      this._shown = false
    }
    if (this._background)
      this._background.style.display = 'none'
  }

  setInitialised(initialised) {
    this._initialised = initialised
  }

  isInitialised() {
    return this._initialised
  }

  getSelector() {
    return this._selector
  }

  getBackgroundSelector() {
    return this._background
  }

  getTriggers() {
    return this._triggers
  }

  getShowWithArr() {
    return this._showWithMe
  }

  isShown() {
    return this._shown
  }

}