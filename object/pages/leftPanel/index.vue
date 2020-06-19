<template>
    <ul class="node-model">
        <li class="t_start"
            @mousedown="mousedown('start')"
            @mouseup="mouseup"
        >Start</li>
        <li class="t_normal">Normal</li>
        <li class="t_exigency">Exigency</li>
        <li class="t_end">End</li>
    </ul>
</template>

<script>
    export default {
        name: "LeftPanel",
        inject:['FlowDT'],
        data(){
            return{

            }
        },
        methods:{
            mouseup(){
                this.$nextTick(
                    ()=>{this.FlowDT.$graph.setMode('default')}
                )
            },
            mousedown(type){
                this.FlowDT.dragType = type;
                this.$nextTick(
                    ()=>{this.FlowDT.$graph.setMode('drg_add')}
                )
            },
        }
    }
</script>
