import { Box } from "../base-classes/base-box";
import Game from "./game.js";
import { Sound } from "../base-classes/sound.js"

export class HitBox extends Box {

    constructor({ x, y, height, width}) {
        super({x, y, height, width})
        this._isCollidingHorizontal = false
        this._isCollidingVertical = false
        this.sound = new Sound('#sound')
        this.sound.initSound('crashSound', '../src/assets/Sounds/crashSound.mp3')
    }

    isCollidingWith(box) {
        // ... some collision logic
        return (
            box.getY() + box.getHeight() >= this.getY() &&
            box.getY() <= this.getY() + this.getHeight() &&
            box.getX() <= this.getX() + this.getWidth() &&
            box.getX() + box.getWidth() >= this.getX()
        )
    }

    /**
     * 
     * @param {Player2} player
     */
    updateHitBox(player) {
        this.setX(player.getX() + 12)
        this.setY(player.getY())
        this.setWidth(45 / player.getScaleX())
        this.setHeight(100 / player.getScaleY())
    }

    /**
     * 
     * @param {Player2} player
     */
    checkForVerticalCollisions(player) {
        /**
         * @platformBlock is of type BaseElement
         */
        for (const platformBlock of player.getPlatformBlocks()) {
            if (this.isCollidingWith(platformBlock)){
                player.setCanJump(true)
                if (player.getVelocityY() > 0) {
                    player.setVelocityY(0)
                    const offset = this.getY() - player.getY() + this.getHeight()
                    player.setY(platformBlock.getY() - offset - 0.01)
                    break // Exit loop after handling collision
                }
    
                if (player.getVelocityY() < 0) {
                this.sound.playSound("crashSound")
                player.setVelocityY(0)
                const offset = this.getY() - player.getY()
                player.setY(platformBlock.getY() + platformBlock.getHeight() - offset + 0.01)
                break // Exit loop after handling collision
                }
            } else
                player.setCanJump(false)
        }
      }

    /**
     * 
     * @param {Player2} player
     */
    checkForHorizontalCollisions(player) {
        // wie kann man das besser machen ?
        const canvasWidth = Game.getInstance().getGameScreen().getCanvas().width

        //right canvas border collision:
        if(this.getX() + this.getWidth() + player.getVelocityX() > canvasWidth) {
            player.setX(canvasWidth - (this.getX() - player.getX() + this.getWidth()) - 0.01)
            return
        }

        //left canvas border collision:
        if(this.getX() + player.getVelocityX() < 0) {
            player.setX(0.01 - (this.getX() - player.getX()))
            return
        }


        /**
         * @platformBlock is of type BaseElement
         */
        for (const platformBlock of player.getPlatformBlocks()) {
            if (this.isCollidingWith(platformBlock)) {
                // todo: Sound class comes soon
                // if (!player.getCanJump()) this.crashSound.play()
                if (player.getVelocityX() > 0) {
                    const offset = this.getX() - player.getX() + this.getWidth()
                    player.setX(platformBlock.getX() - offset - 0.01)
                    if (!player.getCanJump()) {
                        this.sound.playSound("crashSound") 
                        player.setVelocityX(-1 * player.getVelocityX() / 1.1)
                    }
                    else 
                        player.setVelocityX(0)
                    break // Exit loop after handling collision
                }
        
                if (player.getVelocityX() < 0) {
                    const offset = this.getX() - player.getX()
                    player.setX(platformBlock.getX() + platformBlock.getWidth() - offset + 0.01)
                    if (!player.getCanJump())
                        player.setVelocityX(-1 * player.getVelocityX() / 1.1)
                    else player.setVelocityX(0)
                    break // Exit loop after handling collision
                }
            }
                
        }
      }
    checkForGoalReached(player, gaol){
        console.log("TEst")
        if(this.isCollidingWith(gaol.imageCropBox)){
            return (console.log("goal reached"))
        }
    }

}