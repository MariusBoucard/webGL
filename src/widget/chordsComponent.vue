<template>
    <div>
        <div class="container">
    <h1 class="title">Attribution des touches aux accords</h1>
  </div> 
  <div class="container">
    <input class="input" type="text" v-model="currentChord" placeholder="Chord to Add"/>
    <button class="button" @click="addAssociation()">Pret à cliquer</button>
  </div>
  <div class="container">
      
      <ul class="list">
                <li v-for="chord in association" :key="chord" class="list-item">
                    <span class="chord">{{ chord.chord }}</span>
                    <span class="key"> touche : {{ getKeyFromNumber(chord.touche) }}</span>
                    <button class="button" @click="attributeChord(chord)">Jeu accord</button>
                </li>
            </ul>
        </div>
        <CreateChordComponent :accord="chordEngaged.chord" @chordSaved="handleChordSave($event)" v-if="displayChordCreation"></CreateChordComponent>
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
            this.$emit('setAssociation',this.association)

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
        },
        getKeyFromNumber(num){
            return String.fromCharCode(num);
        }
    },
    components: { CreateChordComponent }
}
</script>
<style scoped>
    .container {
      width: 100%;
      text-align: center; /* Center-align the content horizontally */
      /* display: flex;
      align-items: center;
      gap: 10px; Add some space between elements */
    }

    .title {
      font-size: 24px;
      color: #333;
    }
    .input {
      flex-grow: 1; /* Allow the input to take remaining space */
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

  
    .list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #ccc;
    }

    .chord {
      font-size: 14px;
      color: #333;
    }

    .key {
      font-size: 14px;
      color: #666;
    }

    .button {
      padding: 5px 10px;
      background-color: #3498db;
      max-width: 100px;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
</style>