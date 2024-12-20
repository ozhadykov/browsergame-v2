import { Box } from "./base-box"

export class BaseElement extends Box {

    constructor({
        x,
        y,
        height,
        width,
        scale = 1,
        scaleX = 1,
        scaleY = 1,
        imageSrc,
        imageCropBox,
        framesX,
        framesY,
        _directionInversion = 1
    }) {

        super({ x, y, height, width })
        this._scale = scale
        this._scaleY = scaleY
        this._scaleX = scaleX
        this._image = new Image()
        this._image.onload = () => {
            this._imageLoaded = true
            this._height = this._image.height / framesY / this._scaleY
            this._width = this._image.width / framesX / this._scaleX
        }
        this._image.src = imageSrc
        this._imageCropBox = imageCropBox
        this._directionInversion = _directionInversion
        this._framesX = framesX
        this._framesY = framesY
        this._currentFrameX = 0
        this._currentFrameY = 0
    }


    draw(ctx) {
        if (!this._image || !this._imageLoaded)
            return

        ctx.save()
        // update Image crop box position for animation
        this.updateFrames()

        // switchig image
        ctx.scale(this._directionInversion, 1)
        // todo: ctx draw image
        ctx.drawImage(
            this._image,
            this._imageCropBox.getX(),
            this._imageCropBox.getY(),
            this._imageCropBox.getWidth(),
            this._imageCropBox.getHeight(),
            this._x * this._directionInversion,
            this._y,
            this._width * this._directionInversion,
            this._height
        )

        ctx.restore()
    }

    action() {
        // ... do some stuff
    }

    updateFrames() {
        // .. needed to animate
    }

    setDirection(direction) {
        this._directionInversion = direction
    }

    getDirection() {
        return this._directionInversion
    }

}