<template>
    <div class="container">
        <div class="column">
            <ul>
                <li v-for="line in lines" :key="line">{{ line }}</li>
            </ul>
        </div>
        <div class="column">
                <chordsComponent></chordsComponent>
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
        lines : {required : true, type : [String]}
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