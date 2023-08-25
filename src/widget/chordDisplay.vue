<template>
  <div style="text-align: center;">
    <div style="color : white;">
      <h1>{{ chord.name }}</h1>
      {{ chord.caseDepart }} ème case

    </div>
    <div class="cont">

      <div class="container-grid">
        <div class="leftColumn">
          <div :style="getStringStyle" style="color : white" v-for="a in chord.tuning">{{ a }}</div>
        </div>
        <div class="rightColumn" :style="gridStyle">
          <div v-for="s in chord.nbCases * chord.nbStrings" class="cell">
            <div v-if="isSelected(s)" class="dot"></div>
          </div>

        </div>
      </div>
    </div>



  </div>
</template>

<script>
export default {
  props: {
    chord: { required: true, type: Object }
  },
  methods: {

    isSelected(number) {
      return this.chord.selectedFrets.includes(number)
    }},
    computed: {
      nbCases() {
        console.log(this.chord.nbCases * this.chord.nbStrings)
        return parseInt(this.chord.nbCases * this.chord.nbStrings)
      }
      ,
      getStringStyle() {
        return {
          height: `${100 / this.chord.nbStrings}%`,
          'display': 'flex',
          alignItems: 'center', // Vertically center the content
          'justify-content': 'center',
          'background-color': 'grey'
        }
      },
      gridStyle() {
        console.log("caca")
        return {
          'border-left': 'solid black',
          display: 'grid',
          gridTemplateColumns: `repeat(${this.chord.nbCases}, 1fr)`,
          gridTemplateRows: `repeat(${this.chord.nbStrings}, auto)`,
          gap: 0
        }
      },
    }
  }

</script>

<style scoped>
.cont {
  width: 80%;
  margin: auto;
}

.horizontal-line {
  display: flex;
}

.horizontal-line>div {
  flex: 1;
  height: 50px;
  /* Set the desired height */
  border: 1px solid #000;
}


.leftColumn {
  background-color: lightgray;
  /* Background color for the left column */
}

.rightColumn {
  display: grid;
  gap: 1px;
  /* Gap between cells */
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* Equal distribution of space */
  gap: 10px;
  /* Gap between columns */
}

.container-grid {
  display: grid;
  grid-template-columns: 5% 95%;
}

.grid-item {
  border: 1px solid #000;
  padding: 10px;
}

.cell {
  height: 20px;
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
  width: 100%;
  margin: auto;
}
</style>