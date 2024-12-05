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
  constructor({ position, height, width, scale = 1 })
  {
    this.height = height * scale;
    this.width = width * scale;
    this.position = position;

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
