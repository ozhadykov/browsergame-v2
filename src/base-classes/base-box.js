export class Box {
    
    constructor({ x = 0, y = 0, height, width,gameScaleX, gameScaleY }) {
        /**
         * @x is position
         * @y is position
         * */
        this._x = x;
        this._y = y;
        this._gameScaleX = gameScaleX,
        this._gameScaleY = gameScaleY,
        this._height = height;
        this._width = width;
    }

    setX(x) {
        this._x = x
    }
    
    setY(y) {
        this._y = y
    }

    setHeight(height) {
        this._height = height * this._gameScaleY
    }

    setWidth(width) {
        this._width = width
    }

    getX() {
        return this._x
    }
    
    getY() {
        return this._y
    }

    getHeight() {
        return this._height
    }

    getWidth() {
        return this._width
    }
}