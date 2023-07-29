<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div>
    <button @click="currentTab =1">1</button>
    <button @click="currentTab =2">2</button>

    <div v-if="currentTab ===1"> 

      <Tab1Component @newParoles="updateParoles($event)"></Tab1Component>
    </div>
    <div v-if="currentTab === 2"> 
      <Tab2Component @newAssociation="addAssociation($event)" :association="association" :lines="lines"></Tab2Component>  
    </div>
    pute
  </div>
</template>

<script>
import Tab1Component from './components/Tab1Component.vue';
import Tab2Component from './components/Tab2Component.vue'
import { SongCore } from './utils/songCore';
import { getChansonStore } from './store/chansonStore';

export default {
  name: 'App',
  components: {
    Tab1Component,
    Tab2Component
},
  computed: {

  },
  methods: {
    updateParoles(evt){
      this.songCore.updateParoles(evt)
      this.lines = this.chansonStore.getLines()
    },
    addAssociation(evt){
      this.association.push(evt)
    }
  },
  data() {
    return {
      association : [],
      currentTab : 2,
      lines : '',
      paroles : '',
      songCore : undefined,
      chansonStore : undefined
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
