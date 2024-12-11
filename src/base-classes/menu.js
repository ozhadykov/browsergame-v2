export class Menu {

    constructor (selector) {
        this._selector = selector
        this._htmlEL = document.querySelector(this._selector)
        this._shown = false
    }

    show() {
        if (this._htmlEL){
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

    isShown() {
        return this._shown
    }

}