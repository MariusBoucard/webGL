import {  getUserStore } from "@/store/userStore";

export class UserCore{
    constructor(){
        this.userStore = getUserStore()
    }
    setAssociation(asso){
        this.userStore.setAssociation(asso)
    }
    getUser(){
        return this.userStore
    }
    setUserStore(userStore){
        console.log(userStore.association)
        this.userStore.setAssociation(userStore.association)
    }
}