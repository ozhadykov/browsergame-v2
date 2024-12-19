import { BaseElement } from "../base-classes";
import { HitBox } from "./hit-box.js";

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
    super({x, y, height, width, scale, imageSrc, imageCropBox, framesX, framesY });
    }
    //testing
    drawGoal(ctx, goal){
        ctx.fillStyle = `rgba(255,0,0,0.5)`
        ctx.fillRect(goal._x, goal._y, goal._imageCropBox._width, goal._imageCropBox._height)
    }
    checkForGoalReached(player){
      if(
      player._hitBox.getX() + player._hitBox.getWidth() >= this.getX() && player._hitBox.getY() + player._hitBox.getHeight()>= this.getY() &&
      player._hitBox.getX() <= this.getX() + this.getWidth() && player._hitBox.getY() <= this.getY() + this.getHeight()
      ){
        return true
      }
      
    }

}