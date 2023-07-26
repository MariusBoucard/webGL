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
}