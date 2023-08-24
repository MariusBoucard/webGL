export class UserStore{
    constructor(){
        this.association = [ ]
    }
    setAssociation(asso){
        this.association = asso
    }
    getAssociation(){
        return this.association
    }
}

let instance = undefined
export function getUserStore(){
    if(instance){
        return instance
    }
    else {
        return instance = new UserStore()
    }
}