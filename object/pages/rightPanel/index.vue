<template>
    <div>
        {{a}}
    </div>
</template>

<script>
    export default {
        name: "RightPanel",
        inject:['FlowDT'],
        computed:{
            a(){
                let a = '';
                if (this.FlowDT.selectItem !== ''){
                    a = this.FlowDT.selectItem.getModel().id
                }
                return a
            }
        },
        data(){
            return {

            }
        },
    }
</script>

<style scoped>

</style>
