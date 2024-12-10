export default class BaseGameElement {

  /**
   *
   * @param position
   * @param imageSrc
   * @param height
   * @param width
   * @param scale
   * e
   */
  constructor({ positionX, positionY, height, width, scale = 1 })
  {
    this.height = height * scale;
    this.width = width * scale;
    this.positionX = positionX
    this.positionY = positionY

  }

  getHeight() {
    return this.height
  }

  getWidth() {
    return this.width
  }

  setHeight(newHeight) {
    this.height = newHeight
  }

  setWidth(newWidth) {
    this.width = newWidth
  }

  setPositionX(newPositionX) {
    this.positionX = newPositionX
  }

  setPositionY(newPositionY) {
    this.positionY = newPositionY
  }

  action()
  {
  }

  draw(ctx, r, g, b, a, x, y, width, height)
  {
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
    ctx.fillRect(x, y, width, height)
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
  }

}
