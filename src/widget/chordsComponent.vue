<template>
    <div>
        <h1>Select les chords que tu veux attibuer à quelle touche</h1>
        <input type="text" placeholder="chordtoaddd"/>
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
    data(){
        return {
            currentChord : '',
            association : [{
                chord : '',
                touche : ''
            }]

        }
    },
    methods : {
        /**
         * Get event and then attribute and push
         */
        addAssociation(){
                console.log("addassociaiton")
        },
        removeAssociation(id){
            console.log("removeassociation")
        }
    }
}
</script>
