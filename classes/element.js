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
  constructor({ position, height, width })
  {
    this.height = height;
    this.width = width;
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
