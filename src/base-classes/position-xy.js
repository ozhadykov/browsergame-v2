export class PositionXY {

    constructor(x, y) {
        this._x = x
        this._y = y
    }

    setX(x) {
        this._x = x
    }
    
    setY(y) {
        this._y = y
    }

    getX(x) {
        if (this._x >= 0)
            return this._x
        else 
            return 0
    }
    
    getY(y) {
        if (this._y >= 0)
            return this._y
        else 
            return 0
    }
}