import { BaseElement } from "../base-classes";

export default class Goal extends BaseElement {
  constructor(
    {
      x,
      y,
      height,
      width,
      scale,
      imageSrc,
      imageCropBox,
      framesX,
      framesY,
    }) {
    super({ x, y, height, width, scale, imageSrc, imageCropBox, framesX, framesY });
  }
  checkForGoalReached(player) {
    if (
      player._hitBox.getX() + player._hitBox.getWidth() >= this.getX() && player._hitBox.getY() + player._hitBox.getHeight() >= this.getY() &&
      player._hitBox.getX() <= this.getX() + this.getWidth() && player._hitBox.getY() <= this.getY() + this.getHeight()
    ) {
      return true
    }

  }

}