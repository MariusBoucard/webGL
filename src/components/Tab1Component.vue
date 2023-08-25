<template>
    <div>
        <div class="custom-container">
    <input class="custom-input-style" type="file" @change="handleFileChange">
    <audio class="custom-audio-style" :src="audioSrc" ref="audioPlayer" controls>
      <source :src="audioSrc" type="audio/mpeg">
    </audio>
  </div>    
  <div class="custom-container2">
    <h1 class="custom-h1">Text paroles</h1>
    <textarea @blur="updateParoles" class="custom-textarea" v-model="paroles"></textarea>
  </div>
    </div>
</template>
<script>
import { getChansonStore } from '@/store/chansonStore';


export default{
  watch : {
    parole(newValue){
      this.paroles = newValue
    }

  },
   props :{
    parole : { required : true}
   },
    data(){
        return {
            audioSrc : '',
            songName : '',
            song : '',
            paroles : this.parole
        }
    },
    methods : {
        parolesInit(){
            return   `
PAll my friends can see my Pain 
Want to bury me in flames
All my life is lead by Shame
I would fall on the walk of fame

Thiiii

I m always thinking ov
My penis is looking for Love
The only who can judge me is above
I would rape my cheersloves

Tihiiiii

I m always thinking ov
My penis is looking for Love
The only who can judge me is above
I would rape my cheersloves

I would put my dick in your face
While your sleep because you re sick
U'll think that's god who bless
That is the start of your race

Thiiii

I m always thinking ov
My penis is looking for Love
The only who can judge me is above
I would rape my cheersloves

The beginning of our Relation
While you re in suffocation
Sucking without Reason
This is my last Penetration

Thiii
I m always thinking ov
My penis is looking for Love
The only who can judge me is above
I would rape my cheersloves

I would rape
think ov
my cheerslove
Up above
`
            
        },
        
        /**
         * Todo send un event aux parents pour update paroles
         */
        updateParoles(){
                this.$emit('newParoles',this.paroles)
        },
        /**
         * Todo : envoi le blob au parent pour qu'il l ai en général
         * @param {T} event 
         */
        handleFileChange(event) {
            const file = event.target.files[0];
            if (!file){
                console.log("tamere")
                return;
            } 
            console.log("passé")


            const reader = new FileReader();
            reader.onload = (e) => {
                this.audioSrc = URL.createObjectURL(file);
                this.$emit('songLoaded', URL.createObjectURL(file))
                };
            reader.readAsDataURL(file);
            }

    }
}
</script>
<style scoped>
 .custom-h1 {
      font-size: 24px;
      color: #333;
      margin-bottom: 10px;
    }
    
    .custom-textarea {
      width: 100%;
      padding: 10px;
      min-height:500px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
    }
  .custom-container {
      display: flex;
      width: 100%;
      padding: 10px;
      background-color: #e0e0e0;
    }
    .custom-container2 {
      display: flex;
      flex-direction: column;
      text-align: center;
      width: 100%;
      padding: 10px;
      background-color: #e0e0e0;
    }
    .custom-input-style {
      flex-grow: 1;
      flex-shrink: 1;
      padding: 10px;
      margin: 0 5px;
      background-color: #3498db;
      color: white;
      font-size: 14px;
      border: none;
      border-radius: 5px;
    }
    
    .custom-audio-style {
      flex-grow: 1;
      flex-shrink: 1;
      margin: 0 5px;
    }
.textArea{
    flex-grow: 1;
    width : 100%;
    min-height:1000px
}
</style>