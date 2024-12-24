class MenuTrigger {
  constructor({ evtType, evtKey = '', selector = ''}) {
    this._selector = selector
    this._evtType = evtType
    this._evtKey = evtKey
  }

  getSelector() {
    return this._selector
  }

  getEvtType() {
    return this._evtType
  }

  getEvtKey() {
    return this._evtKey
  }

}

export default MenuTrigger