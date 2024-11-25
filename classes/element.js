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
   */
  constructor(
    {
      position,
      imageSrc,
      height,
      width,
      scale = 1,
      frame = 1,
      frameBuffer = 3
    }
  ) {
    this.position = position;
    this.height = height;
    this.width = width;
    this.scale = scale;

    this.frame = frame;
    this.image = new Image();
    this.image.onload = () => {
      this.width = this.image.width / this.frame;
      this.height = this.image.height;
    }
    this.image.src = imageSrc;
    this.currentFrame = 0;
    this.frameBuffer = frameBuffer;
    this.elapsedFrames = 0
  }

  action() {
  }

  draw(ctx, r, g, b, a, x, y, width, height) {
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
    ctx.fillRect(x, y, width, height)
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`

    if (!this.image) return

    const cropBox = {

    }

    //ctx.drawImage(this.image, 16, 0, 16, 16, this.position.x, this.position.y, this.width, this.height)
  }


}
