<template>
    <div class="container">
        <audio :src="audioSrc" ref="audioPlayer" controls @timeupdate="updateCurrentTime">
            <source src="audioSrc" type="audio/mpeg">
        </audio>
        <button @click="changeRecording()">changeRec</button>
        <div class="column">
            <ul>
                <li v-for="line in lines" :key="line">{{ line.text }}</li>
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
        lines: { required: true, type: [String] },
        audioSrc: { required: true }
    },
    created() {
        this.songStore = getChansonStore()
        this.timeStamp = this.songStore.getTimeStamp()
    },
    data() {
        return {
            recording: false,
            songCore : new SongCore(),
            timeStampLines : []
        }
    },
    methods: {
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
                const audioPlayer = this.$refs.audioPlayer;
                this.songCore.addTimeStamp(audioPlayer.currentTime)
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