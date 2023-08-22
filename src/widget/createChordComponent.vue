<template>
  <div>
    <h1>Choix accord</h1>
    <p>{{ accord }}</p>
    <div>
      <p>Case de départ</p>
      <div class="grid-item">

          <button @click="this.changeCaseDepart(-1)">-</button>
          {{ this.caseDepart }}
          <button @click="this.changeCaseDepart(1)">+</button>
       </div>
    </div>
    <div class="grid-container">
      <div class="grid-item">
        <p>Nombre cordes</p>
        <div>
          <button @click="this.changeLineNumber(-1)">-</button>
          {{ this.strings }}
          <button @click="this.changeLineNumber(1)">+</button>
        </div>
        <p>Accordage</p>
        <div class="horizontal-line">
            <select v-for="index in strings" :key="index" @change="handleSelectChange(index-1,$event.target.value)">
              <option :selected="tuning[index-1] === note" v-for="note in notes" :value=note>{{ note }}</option>

            </select>
          </div>

      </div>
      <div class="grid-item">
        <p>Nombre frettes</p>
        <div>
          <button @click="this.changeNumberFrets(-1)">-</button>
          {{ this.frets }}
          <button @click="this.changeNumberFrets(1)">+</button>
        </div>
      </div>
    </div>
    <div class="container-grid">
      <div class="leftColumn">
        <div :style="getStringStyle" v-for="a in strings">{{ tuning[a-1] }}</div>
      </div>
      <div  class="rightColumn" :style="gridStyle">
        <div v-for="s in cases" @click="selectFret(s)" class="cell"> 
          <div v-if="isSelected(s)" class="dot"></div>
        </div>
        
      </div>
    </div>
    <div>
      <button @click="finishChord()">Sauvegarder</button>
    </div>

  </div>
</template>
<style>
.container-grid {
  display: grid;
  grid-template-columns: 5% 95%;
}

.leftColumn {
  background-color: lightgray; /* Background color for the left column */
}

.rightColumn {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* Example grid layout for the right column */
  gap: 1px; /* Gap between cells */
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* Equal distribution of space */
  gap: 10px;
  /* Gap between columns */
}

.grid-item {
  border: 1px solid #000;
  padding: 10px;
}

.cell {
  height: 30px;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  border-top: 1px solid #000;
  padding: 10px;
  text-align: center;
  background-color: white;
  border-top: none;
  position: relative;
  overflow: hidden;
  /* Add this to hide content overflow */
}

/* Add this */
.cell::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  /* Position it in the middle of the cell */
  transform: translateY(-50%);
  border-top: 1px solid #000;
  z-index: 1;
  /* Place the background line behind the content */
}




/* Apply styling for the rightmost cells to remove right border */

.dot {
  border-radius: 50%;
  background-color: black;
  height: 100%;
  width: 50%;
  margin: auto;
}
</style>
<script>
import { popScopeId } from 'vue';


export default {
  props: {
    accord: { required: true, type: String }
  },
  methods: {
    finishChord(){
      //put in a global dataBase saved for futur used

      this.$emit('chordSaved',{
        'name' : this.accord,
        'tuning' : this.tuning,
        'nbStrings' : this.strings,
        'caseDepart' : this.caseDepart,
        'nbCases' : this.frets,
        'selectedFrets' : this.selectedFrets
      })
    },
    changeCaseDepart(nb){
      this.caseDepart+=nb
    },
    selectFret(number) {
      if (this.isSelected(number)) {
        const index = this.selectedFrets.indexOf(number);
        if (index !== -1) {
          this.selectedFrets.splice(index, 1);
        }
      } else {
        this.selectedFrets.push(number)
      }
    },
    isSelected(number) {
      return this.selectedFrets.includes(number)
    },
    handleSelectChange(index,value){
      console.log(index,value)
      this.tuning[index] = value
    },
    changeNumberFrets(nb) {
      if (nb > 0) {
        console.log(this.selectedFrets)
        this.selectedFrets.forEach((nbr, index, array) => {
          console.log(nbr);
          array[index] += Math.floor(nbr / this.frets); // Update the array element
          console.log(array[index]);
        });
        console.log(this.selectedFrets)
      }
      else {
        console.log(this.selectedFrets)
        this.selectedFrets.forEach((nbr, index, array) => {
          console.log(nbr);
          array[index] -= Math.floor(nbr / this.frets); // Update the array element
          console.log(array[index]);
        });
        console.log(this.selectedFrets)
      }
      this.frets += nb
      this.$forceUpdate()
    },
    changeLineNumber(nb) {
      this.strings += nb
      if(nb>0){
        this.tuning.push('A')
      }
      else{
        this.tuning.pop()
      }
    },
    
  },
  data() {
    return {
      caseDepart : 0,
      notes : ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'],
      strings: 6,
      tuning: ['E', 'B', 'G', 'D', 'A', 'E'],
      frets: 5,
      selectedFrets: []
    }
  },
  computed: {
    getStringStyle() {
      return {
        height: `${100 / this.strings}%`,
        'display': 'flex',
        alignItems: 'center', // Vertically center the content
                 'justify-content': 'center'
      }},
    gridStyle() {
      return {
        'border-left': 'solid black',
        display: 'grid',
        gridTemplateColumns: `repeat(${this.frets}, 1fr)`,
        gridTemplateRows: `repeat(${this.strings}, auto)`,
        gap: 0
      };
    },
    cases() {
      return this.strings * this.frets
    }
  }
}
</script>