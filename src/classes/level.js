export class Level {

    constructor (levelId, levelString, background) {
        this._levelId = levelId
        this._levelString = levelString
        this._platforms = []
        this._background = background
    }

    getLevelId() {
        if (this._levelId)
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
    }

    generatePlatfroms() {
        this._platforms = []

        // ... generating platforms
    }
}