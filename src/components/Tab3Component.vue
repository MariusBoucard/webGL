<!-- Record chord component -->
<template>
<div>
    <div>
            <!-- Lecteur -->
            <audio :src="audioSrc" ref="audioPlayer" controls @timeupdate="updateCurrentTime">
            <source src="audioSrc" type="audio/mpeg">
        </audio>
        <!-- Liste des paroles -->
        <ul>
            <li></li>
        </ul>
    </div>
   <div>
       <button @click="recordChord()">Recording</button>
       {{ this.recording }}
       {{ this.chordList }}
       {{ this.lineTime }}
       <ul>
        <li v-for="line in linesNickel">
            {{ line }}
        </li>
       </ul>
   </div>
</div>
</template>
<script>
import { SongCore } from '@/utils/songCore';

export default{
    data(){
        return {
            recording : false,
            songCore : new SongCore(),
            currentTime :0,
            chordList : [],
            lineTime : []
        }
    },
    props : {
        association : {required : true, type : [Object]},
        audioSrc: { required: true },
        lines: { required: true, type: [Object] },


    },
    mounted(){
        this.audioPlayer = this.$refs.audioPlayer; // Assign the audio player reference on mount
    },
    computed : {
        playingIndex(){
                return 'dada'
        },
        linesNickel(){
             // Create a map to store objects from the first array by their id
            const map = new Map();
            console.log(this.lines)
            this.lines.forEach(obj => {
                map.set(obj.index, obj);
            });

            // Merge objects from the second array with corresponding objects from the map
            const mergedArray = this.lineTime.map(obj2 => {
                const obj1 = map.get(obj2.lineId);
                if (obj1) {
                    // Merge attributes from obj1 and obj2
                    return { ...obj1, ...obj2 };
                }
                return obj2; // If there's no corresponding obj1, just keep obj2
            });
            //Add the missing chord lines
                    this.lines.forEach(obj1 => {
                if (!mergedArray.find(ob => ob.index === obj1.index)) {
                    mergedArray.push(obj1);
                }
    });


    return mergedArray;
           
        }
    },
    methods : {
        recordChord(){
            if(this.recording){
                this.recording = false
                document.removeEventListener('keydown', this.addNewChord);
            }
            else{
                this.recording = true
                document.addEventListener('keydown', this.addNewChord);
            }
        },
        updateCurrentTime(){
            this.currentTime = this.$refs.audioPlayer.currentTime
            //recuperation du current time and renvoi le tableau des lignes qui vont bien
        },
        addNewChord(keyStroke){
            //Itere sur les keystrokes qu'on a
            console.log(keyStroke)
            console.log(this.association)
            const asso = this.association.find(asso => asso.touche === keyStroke.keyCode)
            if(asso){
                console.log(asso)
                this.songCore.addChord({ chord : asso.chord, time: this.currentTime })
                 this.chordList = this.songCore.getChordList()
                this.lineTime = this.songCore.computeTimeStampLine()
            }

        },

        getChordLine(line){
            // this.lineTime = this.songCore.computeTimeStampLine()
            const timeLine = this.lineTime.find(li => line === li.lineId)
            console.log(timeLine)
            if(timeLine){
               return timeLine
            }
              
        }
    }
}
</script>
<style>
</style>