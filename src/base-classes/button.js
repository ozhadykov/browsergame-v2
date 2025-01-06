class Button {

    constructor({id, label, classList, dataLevelId}) {
        this._id = id
        this._label = label
        this._classList = classList
        this._dataLevelId = dataLevelId
    }
    
    getHTML() {
        // ... validate properties
        if (this._id && this._label && this._classList && this._dataLevelId) {
            // ... generate button html
            const btnStr = `
                <button id="${this._id}" class="${this._classList}" data-level-id="${this._dataLevelId}">${this._label}</button>
            `
    
            return btnStr
        }

        return ''
    }
}

export default Button