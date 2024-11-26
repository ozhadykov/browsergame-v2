export default class BaseGameElement {

  /**
   *
   * @param position
   * @param imageSrc
   * @param height
   * @param width
   * @param scale
   * @param frame
   * @param frameBuffer
   * @param cropBoxPosition
   */
  constructor(
    {
      position,
      imageSrc,
      height,
      width,
      scale = 1,
      frame = 1,
      frameBuffer = 3,
      cropBoxPosition = {x: 0, y: 0}
    }
  ) {
    this.height = height;
      this.width = width;
    this.position = position;
    this.scale = scale;

    this.frame = frame;
    this.image = new Image();
    this.image.onload = () => {
      // this.height = height;
      // this.width = width;
    }
    this.image.src = imageSrc;
    this.currentFrame = 0;
    this.frameBuffer = frameBuffer;
    this.elapsedFrames = 0
    this.cropBox = {
      height: 16,
      width: 16,
      position: cropBoxPosition
    }
  }

  action() {
  }

  draw(ctx, r, g, b, a, x, y, width, height) {
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
    ctx.fillRect(x, y, width, height)
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`

    if (!this.image) return

    ctx.drawImage(
      this.image,
      this.cropBox.position.x,
      this.cropBox.position.y,
      this.cropBox.height,
      this.cropBox.width,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }


}
