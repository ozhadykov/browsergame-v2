class LevelMeta {

  constructor({
    levelId,
    levelName,
    levelMarkup,
    backgroundImgSrc,
    playerStartPositionX,
    playerStartPositionY,
    playerScaleX,
    playerScaleY
  }) {
    this._levelId = levelId
    this._levelName = levelName
    this._levelMarkup = levelMarkup
    this._backgroundImgSrc = backgroundImgSrc
    this._playerStartPositionX = playerStartPositionX
    this._playerStartPositionY = playerStartPositionY
    this._playerScaleX = playerScaleX
    this._playerScaleY = playerScaleY
  }

  getLevelId() {
    return this._levelId
  }

  getLevelMarkup() {
    return this._levelMarkup
  }

  getLevelName() {
    return this._levelName
  }

  getBackgroundImgSrc() {
    return this._backgroundImgSrc
  }

  getPlayerStartPositionX() {
    return this._playerStartPositionX
  }

  getPlayerStartPositionY() {
    return this._playerStartPositionY
  }

  getPlayerScaleX() {
    return this._playerScaleX
  }

  getPlayerScaleY() {
    return this._playerScaleY
  }

}

export default LevelMeta;