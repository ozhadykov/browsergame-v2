export default class BaseGameElement {

  constructor(params) {
    this.position = params.position;
    this.height = params.height;
    this.width = params.width;
  }

  action() {
  }

  draw(ctx, r, g, b, a, x, y, width, height) {
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
    ctx.fillRect(x, y, width, height)
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
  }


}
