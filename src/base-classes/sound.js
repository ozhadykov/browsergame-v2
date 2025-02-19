
export class Sound {
    constructor () {
        if (Sound.instance) return Sound.instance
        this.name
        this.index
        this.src
        this.maxSounds = 0
        this.soundFiles = []
    }

    setVol() {
        var slider = document.getElementById("myRange")
        this.vol = slider.value;
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
        }
    }

    playSound(name, newRelativeVolume, speed) {
        let relativeVolume = newRelativeVolume ?? 1
        for (let j = 1; j <= this.maxSounds; j += 1) {
            if (this.soundFiles[j].soundName == name) {
                this.soundFiles[j].soundAudio.volume = 0.02 * ((this.vol * relativeVolume) / 100)
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