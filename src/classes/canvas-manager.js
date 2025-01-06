import { ScreenManager } from "../base-classes/menu";

export class GameScreen extends ScreenManager {

    /**
     * @param selector; this should be a selector for a querySelector method
     */
    constructor (selector, hasFrame, frameID) {
        super(selector)
        this._hasFrame = hasFrame ?? false
        this._frameID = frameID ?? null
        this._ctx = this._htmlEL.getContext("2d")
    }

    getCanvas() {
        if (this._htmlEL)
            return this._htmlEL
        else
            throw new Error(`selector ${this._selector} is invalid, html element not found`)
    }

    displayFrame() {
        if (this._hasFrame) {
            console.log('displaying frame',this._frameID)
            if (this._frameID) {
                let gameFrame = document.getElementById(this._frameID)
                if (gameFrame) {
                    gameFrame.style.display = 'block'   
                } else {
                    throw new Error(`gameFrame with id ${this._frameID} not found`)
                }
            } else {
                throw new Error('frameID not set')
            }
        }
    }

    updateFrame() {
        if (this._hasFrame) {
            if (this._frameID) {
                let gameFrame = document.getElementById(this._frameID)
                if (gameFrame) {
                    const gameCanvas = document.getElementById('my-canvas')
                    const canvasRect = gameCanvas.getBoundingClientRect();
                    gameFrame.style.top = `${canvasRect.top - 256}px`;
                    gameFrame.style.left = `${canvasRect.left - 479}px`;
                    gameFrame.style.width = `${canvasRect.width + 970}px`;
                    gameFrame.style.height = `${canvasRect.height + 570}px`;    
                } else {
                    throw new Error(`gameFrame with id ${this._frameID} not found`)
                }
            } else {
                throw new Error('frameID not set')
            }
        }
    }

    hideFrame() {
        if (this._hasFrame) {
            if (this._frameID) {
                let gameFrame = document.getElementById(this._frameID)
                if (gameFrame) {
                    gameFrame.style.display = 'none'
                } else {
                    throw new Error(`gameFrame with id ${this._frameID} not found`)
                }
            } else {
                throw new Error('frameID not set')
            }
        }
    }

    getContext() {
        if (this._ctx)
            return this._ctx
        else 
            throw new Error('Context for canvas not found')
    }

    getCanvasWidth() {
        if (this._htmlEL)
            return this._htmlEL.width
        
        return 0
    }
    getCanvasHeight() {
        if (this._htmlEL)
            return this._htmlEL.height
        return 0
    }
}