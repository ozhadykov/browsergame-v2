export class Sound {
    constructor () {
        if (Sound.instance) return Sound.instance
        this.name
        this.index
        this.src
        this.maxSounds = 0
        this.soundFiles = []
        this.vol = 100
    }

    setVol(newVol){
        if (newVol >= 0 && newVol <= 100) this.vol = newVol
        else console.log("Volume is out of Bounds")
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
                    soundAudio: new Audio(src)
                }
                this.soundFiles[j].soundAudio.preload = "auto"
                this.soundFiles[j].soundAudio.mozPreservesPitch = false
            }
            console.log(this.soundFiles[j])
        }
    }

    playSound(name, speed) {
        for (let j = 1; j <= this.maxSounds; j += 1) {
            if (this.soundFiles[j].soundName == name) {
                this.soundFiles[j].soundAudio.volume = 0.01 * (this.vol / 100)
                console.log(0.01 * (this.vol / 100))
                if (speed)this.soundFiles[j].soundAudio.playbackRate = speed
                this.soundFiles[j].soundAudio.play() 
            }
        }
    }

    stopSound(name) {
        for (let j = 1; j <= this.maxSounds; j += 1) {
            if (this.soundFiles[j].soundName == name) {
                this.soundFiles[j].soundAudio.pause()
                this.soundFiles[j].soundAudio.load() 
            }
        }
    }
}