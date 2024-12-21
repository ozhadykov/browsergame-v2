import { Box, BaseElement } from "../base-classes"

export class Level {

    constructor ({levelId, levelString, background}) {
        this._levelId = levelId
        this._levelString = levelString
        this._platforms = []
        this._background = background
    }

    getLevelId() {
        if (this._levelId !== undefined && this._levelId !== null)
            return this._levelId
        else
            return -1
    }

    getPlatformsObjects() {
        if (this._platforms)
            return this._platforms
        else    
            return []
    }

    setLevel(levelId, levelString) {
        this._levelId = levelId
        this._levelString = levelString

        this.generatePlatfroms()
    }

    getBackground() {
        // todo: think about fallback value
        if (this._background)
            return this._background
        else 
            return null
    }

    generatePlatfroms() {
        // ... generating platforms
        this._platforms = []
        const levelMarkup = this._levelString.replace(/\s+/g, '').split('+')
        
        levelMarkup.forEach((levelRow, y) => {
            levelRow.split('').forEach((levelEl, x) => {
              // TODO: Define, what kind of platform should be created
              
              if (levelEl !== '-') {
                const platformEl = new BaseElement({
                    x: x * 16,
                    y: y * 8,
                    scaleX: 1,
                    scaleY: 2,
                    imageSrc: '../../src/assets/platform/block.png',
                    imageCropBox: new Box({
                        x: 0,
                        y: 0,
                        height: 16,
                        width: 16
                    }),
                    framesX: 3,
                    framesY: 3
                })
                this._platforms.push(platformEl)
              }
            })
          })
        
        return this._platforms
    }

}