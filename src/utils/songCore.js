import { getChansonStore } from "@/store/chansonStore";

export class SongCore{
    constructor(){
        this.chansonStore = getChansonStore()
    }
    loadSong(){
        //TODO brancher avec la fonction de base : plus simple de store dans le main
    }
    changeName(name){
        this.chansonStore.setTitle(name)
    }
    /**
     * Rajoute un time stamp, besoin struct ?
     * @param {*} time 
     */
    addTimeStamp(time){
        this.chansonStore.addTimeStamp(time)
    }
    /**
     * Return les lignes avec leurs temps de debut et de fin sous forme d'un tableau d'objet
     * { lineID : "",
     * lineDeb : ,
     * lineFin : ''}
     */
    computeTimeStampLine(){
        var finish = []
        var times = this.chansonStore.getTimeStamp()
        times = times.sort((a,b)=> a-b)
        console.log(times,'should be sorted')
        for(var i =0;i<times.length-1;i++){
            console.log(this.chansonStore.getChordList())
            const chords = this.chansonStore.getChordList().find(chord => chord.time < times[i+1] && chord.time > times[i])
            finish.push({
                lineId : i,
                lineDeb : times[i],
                lineFin : times[i+1],
                chordInLine : chords
            })
        }
        return finish
    }

    updateParoles(text){
        console.log(this.chansonStore)
        this.chansonStore.setLyrics(text)
        this.chansonStore.setLyricsLineSplit(this.parseLyricsInLine(text))
    }
    parseLyricsInLine(text){
        var tab = []
        tab = text.split('\n')
        var lines = []
        tab.forEach((a,index)=> lines.push({
            index : index, text: a
        }))
        return lines
    }
    addChord(chord){
    this.chansonStore.addChord(chord)
    this.renderText()
    }
    getChordList(){
        return this.chansonStore.getChordList()
    }
    renderText(){
        //TODO : rend le text nickel de la chanson
    }
    giveLineNumeroForTime(time){
        return //le numero de la ligne
    }
    removeTimeStamp(id){
        
    }
}