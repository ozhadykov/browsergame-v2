import BaseGameElement from "./element.js";

export class Background extends BaseGameElement {
  constructor(
    {
      position,
      height,
      width,
      imageSrc,
      scale = 1,

    }) {
    super({position, height, width});
    this.loaded = false
    this.image = new Image();
    this.image.onload = () => {
      this.width = this.image.width * this.scale
      this.height = this.image.height * this.scale
      this.loaded = true
    }
    this.image.src = imageSrc;
    this.scale = scale
  }


  draw(ctx, r, g, b, a, x, y, width, height) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

  }

}
