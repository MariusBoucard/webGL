<template>
    <div>
        <h1>Select les chords que tu veux attibuer à quelle touche</h1>
        <input type="text" v-model="currentChord" placeholder="chordtoaddd"/>
        <button @click="addAssociation()">pret a cliquer</button>
        <ul>
            <li v-for="chord in association" :key="chord">
                {{ chord }}
            </li>
        </ul>
    </div>
</template>
<script>
import nanoid from 'nanoid'
export default{
    props : {
        association : {
            required : true,
            type : [Object]
        }
        
    },
    data(){
        return {
            currentChord : '',
        }
    },
    methods : {
        newAssociation(event) {
            this.associer =true
          // Assuming you want the ASCII code of the pressed key

          this.associer =false
          this.$emit('newAssociation',{chord : this.currentChord, touche : event.keyCode})
          document.removeEventListener('keydown', this.newAssociation);
        },

        /**
         * Get event and then attribute and push
         */
        addAssociation(){
                this.associer =true
                console.log("addassociaiton")
                document.addEventListener('keydown', this.newAssociation);
        },
        removeAssociation(id){
            console.log("removeassociation")
        }
    }
}
</script>
