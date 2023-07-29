<template>
    <div>
   
        <input type="file" @change="handleFileChange">
        <audio :src="audioSrc" ref="audioPlayer" controls>
      <source src="audioSrc" type="audio/mpeg">
    </audio>

    <h1>Text paroles</h1>
    <textarea @blur="updateParoles" class="textArea" v-model="paroles">

    </textarea>
    </div>
</template>
<script>

export default{
    data(){
        return {
            audioSrc : '',
            songName : '',
            song : '',
            paroles : this.parolesInit(),
        }
    },
    methods : {
        parolesInit(){
            return   `
Paroles de Take a seat

This is how I began my journey
as an outlander in the space
I made in this inhospitable world
A place where I feel safe

step after step, I dispel the fog
exploring this brand new dimension
some instruments as a torchlight
I pursue my ascension

this is why I climb the ladder
even if i m feared of height
we both feel the same
and both belong to the art

Come on
Take a sit, we'll talk about our universe
a place of refuge when our feet can t find the earth
drew by our god's hands, we set its shape
According to our desire, we sculpt its landscape

Erased on life
Somehow lunatic
I don't belong to this world
but still beg to get in it

Can you feel the blur that is Storming around
as venus fingers slept in mine
peoples got their flame blown down
a lead blanket, overlooks the town

When the compass lost the north
As things are getting worst
the storm will stay raging outside
as we've got our shelter to hide

I approch the stars at risk of burning my wings
we break through the fourth walls
and so unveiled the last part of unknown
And baby know that by now we're free

On event horizon
Man edge their righteous to gods
To borrow their abilities
To dispel the fog

From the hand of creator
I paint with a trembling hand
Some galaxies composed by
A thousand stars taking in a swarm

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
<style>
.textArea{
    width : 100%;
    height:1000px
}
</style>