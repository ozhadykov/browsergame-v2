export class BaseBox {
    
    constructor({ x = 0, y = 0, height, width }) {
        this._x = x;
        this._y = y;
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

    getX() {
        if (this._x >= 0)
            return this._x
        else 
            return 0
    }
    
    getY() {
        if (this._y >= 0)
            return this._y
        else 
            return 0
    }

    getHeight() {
        if (this._height >= 0)
            return this._height
        else
            return 0
    }

    getWidth() {
        if (this._width >= 0)
            return this._width
        else
            return 0
    }

    isCollidingWith(box) {
        // ... some collision logic
        return (
            box.getY() + box.getHeight() >= this.getY() &&
            box.getY() <= this.getY() + this.getHeight() &&
            box.getX() <= this.getX() + this.getWidth() &&
            box.getX() + box.getWidth() >= this.getX()
        )
    }
}