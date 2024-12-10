import { BaseBox } from "./base-box"

export class BaseElement extends BaseBox {
    
    constructor (
        x,
        y,
        height,
        width,
        scale,
        imageSrc
    ) {
        super(x, y, height, width)
        this._scale = scale
        this._image = new Image()
        this._image.onload = () => {
            this._imageLoaded = true
            this._height * this._scale
            this._width * this._scale
        }
        this._image.src = imageSrc
    }


    draw() {
        if (!this._image || !this._imageLoaded)
            return 

        // todo: ctx draw image
    }

}