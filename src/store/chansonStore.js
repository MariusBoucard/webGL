export class chansonStore{
    constructor(){
        this.title = '',
        this.audio = '',
        this.lyrics = '',
        this.chordList = [],
        this.lyricsLineSplit = []
        this.timeStampLignes = []
    }
    setTitle(title){
        this.title = title
    }
    setAudio(audio){
        this.audio = audio
    }
    setLyrics(lyrics){
        this.lyrics = lyrics
    }
    addChord(chord){
        this.chordList.push(chord)
    }
    removeAllChords(){
        this.chordList = []
    }

}


let instance = undefined
export function getChansonStore(){
    if(instance){
        return instance
    }
    else {
        instance = new chansonStore()
    }
}