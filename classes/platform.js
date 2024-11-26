import BaseGameElement from "./element.js";

export class Platform extends BaseGameElement {

  constructor(
    {
      position,
      height,
      width,
      imageSrc,
      cropBoxPosition = {x: 0, y: 0},
    }
  ) {

    super({position, height, width})

    this.image = new Image();
    this.image.onload = () => {
      console.log('Image ready')
    }
    this.image.src = imageSrc;
    this.cropBox = {
      height: 16,
      width: 16,
      position: cropBoxPosition
    }
  }

  draw(ctx) {
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

  action() {

  }


}

