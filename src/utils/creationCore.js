import { getChansonStore } from "@/store/chansonStore";

export class CreationCore{
    constructor(){
        this.chansonStore = getChansonStore()
    }
    //Crée le fichier a partir des données présentes dans le store
    compose(){

    }
    //compute numer of space to add regarding the timeStamp of a chord
    computeNumberOfSpace(){

    }
}