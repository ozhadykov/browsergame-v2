import { BaseBox } from "./base-box"

export class BaseElement extends BaseBox {
    
    constructor ({
        x,
        y,
        height,
        width,
        scale = 1,
        imageSrc,
        imageCropBox,
        framesX,
        framesY
    }) {
        
        super({x, y, height, width})
        this._scale = scale
        this._image = new Image()
        this._image.onload = () => {
            this._imageLoaded = true
            this._height = this._image.height * this._scale / framesX
            this._width = this._image.width * this._scale / framesY
        }
        this._image.src = imageSrc
        this._imageCropBox = imageCropBox
    }


    draw(ctx) {
        if (!this._image || !this._imageLoaded)
            return 
        
        // ctx.save()

        // todo: ctx draw image
        ctx.drawImage(
            this._image,
            this._imageCropBox.getX(),
            this._imageCropBox.getY(),
            this._imageCropBox.getWidth(),
            this._imageCropBox.getHeight(),
            this.getX(),
            this.getY(),
            this.getWidth(),
            this.getHeight()
        )

        // ctx.restore()
    }

    action() {
        // ... do some stuff
    }

}