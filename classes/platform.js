import BaseGameElement from "./element.js";

export class Platform extends BaseGameElement {

  constructor(
    {
      positionX,
      positionY,
      height,
      width,
      imageSrc,
      cropBoxPositionX = 0, // Default value
      cropBoxPositionY = 0, // Default value
      cropBoxHeight = 16,   // Default value
      cropBoxWidth = 16     // Default value
    }
  ) {

    super({positionX, positionY, height, width})

    this.image = new Image();
    this.image.onload = () => {
      console.log('Image ready')
    }
    this.image.src = imageSrc;
    this.cropBoxHeight = cropBoxHeight;
    this.cropBoxWidth = cropBoxWidth;
    this.cropBoxPositionX = cropBoxPositionX;
    this.cropBoxPositionY = cropBoxPositionY;

  }

  draw(ctx) {
    if (!this.image) return

    ctx.drawImage(
      this.image,
      this.cropBoxPositionX,
      this.cropBoxPositionY,
      this.cropBoxHeight,
      this.cropBoxWidth,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    )
  }

  action() {

  }
}

