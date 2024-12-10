import { PositionXY } from "./position-xy.js"

export class BaseBox {
    
    constructor(x, y, height, width) {
        this._position = new PositionXY(x, y)
        this._height = height
        this._width = width
    }

    setHeight(height) {
        if (height >= 0)
            this._height = height
        else
            this._height = 0
    }

    setWidth(width) {
        if (width >= 0)
            this._width = width
        else
            this._width = 0
    }

    getHeight() {
        if (this._height >= 0)
            return this._height
        else
            return 0
    }

    getWidtht() {
        if (this._width >= 0)
            return this._width
        else
            return 0
    }
}