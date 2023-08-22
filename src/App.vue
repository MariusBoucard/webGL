<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div>
    <button @click="currentTab =1">1</button>
    <button @click="currentTab =2">2</button>
    <CreateChordComponent></CreateChordComponent>
    <div v-if="currentTab ===1"> 

      <Tab1Component @songLoaded="newSongLoaded($event)" @newParoles="updateParoles($event)"></Tab1Component>
    </div>
    <div v-if="currentTab === 2"> 
      <Tab2Component :audioSrc="audioSrc" @newAssociation="addAssociation($event)" :association="association" :lines="lines"></Tab2Component>  
    </div>
    <div>
      <Tab3Component :lines="lines" :audioSrc="audioSrc" :association="association"></Tab3Component>
    </div>
    pute
  </div>
</template>

<script>
import Tab1Component from './components/Tab1Component.vue';
import Tab2Component from './components/Tab2Component.vue'
import { SongCore } from './utils/songCore';
import { getChansonStore } from './store/chansonStore';
import Tab3Component from './components/Tab3Component.vue';
import CreateChordComponent from './widget/createChordComponent.vue';

export default {
  name: 'App',
  components: {
    Tab1Component,
    Tab2Component,
    Tab3Component,
    CreateChordComponent
},
  computed: {

  },
  methods: {
    newSongLoaded(evt){
      this.audioSrc = evt
    },
    updateParoles(evt){
      this.songCore.updateParoles(evt)
      this.lines = this.chansonStore.getLines()
    },
    addAssociation(evt){
      this.association.push(evt)
    },
    addLineStamp(evt){
      
    }
  },
  data() {
    return {
      association : [{chord : "F" , touche : 70}],
      currentTab : 2,
      lines : [],
      paroles : '',
      songCore : undefined,
      chansonStore : undefined,
      audioSrc : undefined
    }
  },
  created() {
    this.songCore = new SongCore()
   this.chansonStore = getChansonStore()
  }
}
</script>

<style lang="scss">

</style>
