<template>
    <div class="container">
        {{ this.currentTime }}
        <audio :src="audioSrc" ref="audioPlayer" controls @timeupdate="updateCurrentTime">
            <source src="audioSrc" type="audio/mpeg">
        </audio>
        <button @click="changeRecording()">changeRec</button>
        <div class="column">
            <ul>
                <li v-for="line in lines" :key="line">{{ line.text }}</li>
            </ul>
            <hr>
            <ul>
            <li v-for="time in lineToDisplay" :key="time"> {{ time }}</li>
        </ul>

        </div>
        <div class="column">
            <chordsComponent @newAssociation="passAsso($event)" :association="association"></chordsComponent>
        </div>
        <ul>
            <li v-for="time in timeStampLines" :key="time"> {{ time }}</li>
        </ul>
    </div>
</template>
<script>
import { SongCore } from '@/utils/songCore';
import chordsComponent from '../widget/chordsComponent.vue'
import { getChansonStore } from '@/store/chansonStore';
export default {
    components: {
        chordsComponent,
    },
    props: {
        association: { required: true, type: [Object] },
        lines: { required: true, type: [Object] },
        audioSrc: { required: true }
    },
    mounted(){
        this.audioPlayer = this.$refs.audioPlayer; // Assign the audio player reference on mount

    },
    created() {
        this.songStore = getChansonStore()
        this.timeStamp = this.songStore.getTimeStamp()
    },
    computed :{
       lineToDisplay(){
            var retur = []
            var currentLine = this.timeStampLines.find(line => line.lineDeb < this.currentTime && line.lineFin > this.currentTime)
            if(!currentLine){
                return
            }
            console.log(currentLine)
            console.log(currentLine.lineId)
            
            const linesCopy = [...this.lines]
            linesCopy.forEach(li => {
                if(li.index > currentLine.lineId-3 && li.index < currentLine.lineId+3){
                    console.log("fart")
                    retur.push(li)
                }
            }
            )
            console.log(retur)
            return retur
       }
    },
    data() {
        return {
            recording: false,
            songCore : new SongCore(),
            timeStampLines : [],
            currentTime : 0
        }
    },
    methods: {
         /**
         * CurrentLine
         */
         updateCurrentTime(){
            this.currentTime = this.$refs.audioPlayer.currentTime
            //recuperation du current time and renvoi le tableau des lignes qui vont bien
            
        },
        changeRecording() {
            this.recording = !this.recording
            if(this.recording){
                document.addEventListener('keydown', this.addTimeStamp);
            } else{
                document.removeEventListener('keydown', this.addTimeStamp);
            }
        },
        addTimeStamp(event) {
            console.log(event.keyCode)
            if(event.keyCode === 32){
                console.log('c passe')
                this.songCore.addTimeStamp(this.currentTime)
                this.timeStampLines = this.songCore.computeTimeStampLine()
                this.$forceUpdate()
            }
        },
        passAsso(evt) {
            this.$emit('newAssociation', evt)
        }
    }
}
</script>
<style>
.container {
    display: flex
}

.column {
    width: 50%
}
</style>