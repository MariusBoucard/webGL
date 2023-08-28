export class ChansonStore{
    constructor(){
        this.title = ''
        this.audio = ''
        this.lyrics = ''
        this.chordList = [],
        this.lyricsLineSplit = []
        this.timeStamp = []
        this.audioSrc = undefined
        this.auteur = ''
    }
    getLyrics(){
        return this.lyrics
    }
    setAuteur(aut){
        this.auteur = aut
    }
    getAuteur(){
        return this.auteur
    }
    setChanson(chanson){
        this.title = chanson.title
        this.audio = chanson.audio
        this.lyrics = chanson.lyrics
        this.chordList = chanson.chordList
        this.lyricsLineSplit = chanson.lyricsLineSplit
        this.timeStamp = chanson.timeStamp
        this.audioSrc = chanson.audioSrc
        this.auteur = chanson.auteur
    }
    setTitle(title){
        this.title = title
    }
    getTitle(){
        return this.title
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
    
setChordList(li){
    this.chordList=li
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
    removeTimeStamp(timeStamp){
        this.timeStamp = this.timeStamp.filter(ti => !ti.toString().includes(timeStamp.toString()))
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