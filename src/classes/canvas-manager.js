import { Menu } from "../base-classes/menu";

export class CanvasManager extends Menu {

    constructor (selector) {
        super(selector)
        this._ctx = this._canvas.getContext("2d")
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
}