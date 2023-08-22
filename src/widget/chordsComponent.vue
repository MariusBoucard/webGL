<template>
    <div>
        <h1>Select les chords que tu veux attibuer à quelle touche</h1>
        <input type="text" v-model="currentChord" placeholder="chordtoaddd"/>
        <button @click="addAssociation()">pret a cliquer</button>
        <CreateChordComponent :accord="chordEngaged.chord" @chordSaved="handleChordSave($event)" v-if="displayChordCreation"></CreateChordComponent>
        <ul>
            <li v-for="chord in association" :key="chord">
                {{ chord }}
                <button @click="attributeChord(chord)">Display chord creation</button>
            </li>
        </ul>
    </div>
</template>
<script>
import nanoid from 'nanoid'
import CreateChordComponent from './createChordComponent.vue'
export default{
    props: {
        association: {
            required: true,
            type: [Object]
        }
    },
    data() {
        return {
            currentChord: '',
            displayChordCreation : false,
            chordEngaged : ''
        };
    },
    methods: {
        handleChordSave(ev){
            this.chordEngaged.accord = ev
            console.log(this.association)
            this.displayChordCreation = false

        },
        attributeChord(chord) {
            this.displayChordCreation = true;
            this.chordEngaged = chord
        },
        newAssociation(event) {
            this.associer = true;
            // Assuming you want the ASCII code of the pressed key
            this.associer = false;
            this.$emit('newAssociation', { chord: this.currentChord, touche: event.keyCode });
            document.removeEventListener('keydown', this.newAssociation);
        },
        /**
         * Get event and then attribute and push
         */
        addAssociation() {
            this.associer = true;
            console.log("addassociaiton");
            document.addEventListener('keydown', this.newAssociation);
        },
        removeAssociation(id) {
            console.log("removeassociation");
        }
    },
    components: { CreateChordComponent }
}
</script>
