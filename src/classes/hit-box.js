import { Box } from "../base-classes/base-box";
import Game from "../../classes/game";

export class HitBox extends Box {

    constructor({ x, y, height, width}) {
        super({x, y, height, width})
        this._isCollidingHorizontal = false
        this._isCollidingVertical = false
    }

    isCollidingWith(playerHitbox) {
        // ... some collision logic
        return (
            playerHitbox.getY() + playerHitbox.getHeight() >= this.getY() &&
            playerHitbox.getY() <= this.getY() + this.getHeight() &&
            playerHitbox.getX() <= this.getX() + this.getWidth() &&
            playerHitbox.getX() + playerHitbox.getWidth() >= this.getX()
        )
    }

    /**
     * 
     * @param {Player} player 
     */
    updateHitBox(player) {
        this.setX(player.getX() + 8)
        this.setY(player.getY())
        this.setWidth(27 * this._scale)
        this.setHeight(50 * this._scale)
    }

    /**
     * 
     * @param {Player} player 
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
     * @param {Player} player 
     */
    checkForHorizontalCollisions(player) {
        // wie kann man das besser machen ?
        const canvasWidth = Game.getInstance().getCanvas().width

        /**
         * @platformBlock is of type BaseElement
         */
        for (const platformBlock of player.getPlatformBlocks()) {
            if (this.isCollidingWith(platformBlock) || 
                (player.getX() + player.getVelocityX() < 0 || 
                player.getX() + player.getWidth() + player.getVelocityX() > canvasWidth)) {
                // todo: Sound class comes soon
                // if (!player.getCanJump()) this.crashSound.play()
                if (player.getVelocityX() > 0) {
                    const offset = this.getX() - player.getX() + this.getWidth()
                    player.setX(platformBlock.getX() - offset - 0.01)
                    if (!player.getCanJump()) 
                        player.setVelocityX(-1 * player.getVelocityX() / 1.1)
                    else 
                        player.setVelocityX(0)
                    break // Exit loop after handling collision
                }
        
                if (player.getVelocityX() < 0) {
                    const offset = this.getX() - player.getX()
                    player.setX(platformBlock.getX() + offset + 0.01)
                    if (!player.getCanJump()) 
                        player.setVelocityX(-1 * player.getVelocityX() / 1.1)
                    else player.setVelocityX(0)
                    break // Exit loop after handling collision
                }
            }
                
        }
      }

}