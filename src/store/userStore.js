export class UserStore{
    constructor(){
        this.chordsInUse = [
            { chord : 'Em', key : 'E' },
            { chord : 'A', key : 'A' },
    ]
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