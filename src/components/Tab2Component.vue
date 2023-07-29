<template>
    <div class="container">
        <div class="column">
            <ul>
                <li v-for="line in lines" :key="line">{{ line }}</li>
            </ul>
        </div>
        <div class="column">
                <chordsComponent @newAssociation="passAsso($event)" :association="association"></chordsComponent>
</div>
    </div>
</template>
<script>
import chordsComponent from '../widget/chordsComponent.vue'
export default{
    components : {
        chordsComponent,
    },
    props : {
        association : {required : true , type : [Object]},
        lines : {required : true, type : [String]}
    },
    methods : {
        passAsso(evt){
            this.$emit('newAssociation',evt)
        }
    }
}
</script>
<style>
.container{
    display:flex
}
.column{
    width:50%
}
</style>