import { getChansonStore } from "@/store/chansonStore";

export class SongCore{
    constructor(){
        this.chansonStore = getChansonStore()
    }
    loadSong(){

    }
    changeName(name){
        this.chansonStore.setTitle(name)
    }
    addTimeStamp(time){

    }
    computeTimeStampLine(){

    }
    updateParoles(text){
        console.log(this.chansonStore)
        this.chansonStore.setLyrics(text)
        this.chansonStore.setLyricsLineSplit(this.parseLyricsInLine(text))
    }
    parseLyricsInLine(text){
        var tab = []
        tab = text.split('\n')
        console.log(tab)
        return tab

    }
    giveLineNumeroForTime(time){
        return //le numero de la ligne
    }
    removeTimeStamp(id){
        
    }
}