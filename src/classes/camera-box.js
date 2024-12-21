import { Box } from "../base-classes";
import Game from "./game";

export class CameraBox extends Box {

    constructor({ x, y, height, width }) {
        super({x, y, height, width})
    }

    updateHorizontalCamera(hitBox) {
        const canvas = Game.getInstance().canvas
    
        hitBox.getX() + hitBox.getWidth() >= canvas.width / 2 ?
        this.setX(canvas.width / 2) : 
        this.setX(0)
    }

    updateVerticalCamera(hitBox) {
        hitBox.getY() - 111 >= 0 ?
        this.setY(hitBox.getY() - 111) :
        this.setY(0)
    }
}