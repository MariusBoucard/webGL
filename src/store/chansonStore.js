export class ChansonStore{
    constructor(){
        this.title = ''
        this.audio = ''
        this.lyrics = ''
        this.chordList = [],
        this.lyricsLineSplit = []
        this.timeStamp = []
        this.audioSrc = undefined
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
    setLyricsLineSplit(lls){
        this.lyricsLineSplit = lls
    }
    getLines(){
        return this.lyricsLineSplit
    }
    addChord(chord){
        this.chordList.push(chord)
    }
    getChordList(){
        return this.chordList
    }
    removeAllChords(){
        this.chordList = []
    }
    addTimeStamp(timeStamp){
        this.timeStamp.push(timeStamp)
    }
    getTimeStamp(){
        return this.timeStamp
    }
    setSong(audio){
        this.audioSrc = audio
    }
    getSong(){
        return this.audioSrc
    }
    /**
     * Should allow to save the song in a defined path
     * @param {*} path 
     */
    saveSong(path){
        const text = JSON.stringify(this)
        const blob = new Blob([text], { type: 'text/plain' });
        const blobUrl = URL.createObjectURL(blob);
  
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'myfile.txt';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    }
    /**
     * Should Allow to retreive the data of the song
     * @param {*} path 
     */
    loadFile(filePath){
       
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onload = (event) => {
         const data = JSON.parse(event.target.result);
         this.lyrics = data.lyrics
         this.lyricsLineSplit = data.lyricsLineSplit
         console.log('ca passe')
          // this.$forceUpdate()
        };
        reader.readAsText(filePath);
    }

    

}


let instance = undefined
export function getChansonStore(){
    console.log("get",instance)
    if(instance !== undefined){
        return instance
    }
    else {
        console.log("on crée")
        return instance = new ChansonStore()
    }
}