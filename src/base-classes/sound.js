export class Sound {
    constructor () {
        this.name
        this.index
        this.src
        this.maxSounds = 0
        this.soundFiles = []
        this.vol = 50
    }

    setVol(newVol){
        if (newVol >= 0 && newVol <= 100) {
            this.vol = newVol
        } else console.log("Volume is out of Bounds")
    }

    getVol() {
        return this.vol
    }

    initSound(name, src) {
        ++this.maxSounds
        for (let j = 1; j <= this.maxSounds; j += 1) {
            if(!this.soundFiles[j]) {
                this.soundFiles[j] = {
                    soundName: name,
                    soundFile: new Audio(src)
                }
                this.soundFiles[j].soundFile.preload = "auto"
            }
            console.log(this.soundFiles[j])
        }
    }

    palySound(name) {
        for (let j = 1; j <= this.maxSounds; j += 1) {
            if (this.soundFiles[j].soundName == name) {
                this.soundFiles[j].soundFile.volume = 0.1 * (this.vol / 50)
                this.soundFiles[j].soundFile.play() 
            }
        }
    }

    stopSound(name) {
        for (let j = 1; j <= this.maxSounds; j += 1) {
            if (this.soundFiles[j].soundName == name) {
                this.soundFiles[j].soundFile.pause()
                this.soundFiles[j].soundFile.load() 
            }
        }
    }
}