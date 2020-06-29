<template>
    <ul class="node-model">
        <li class="t_start"
            @mousedown="mousedown('start_node')"
            @mouseup="mouseup"
        >Start</li>
        <li class="t_normal"
            @mousedown="mousedown('normal_node')"
            @mouseup="mouseup"
        >Normal</li>
        <li class="t_exigency"
            @mousedown="mousedown('exigency_node')"
            @mouseup="mouseup"
        >Exigency</li>
        <li class="t_warning"
            @mousedown="mousedown('warning_node')"
            @mouseup="mouseup"
        >Warning</li>
        <li class="t_end"
            @mousedown="mousedown('end_node')"
            @mouseup="mouseup"
        >End</li>
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
                //保存拖拽节点的类型传递给drag_add交互行为
                this.FlowDT.dragType = type;
                this.$nextTick(
                    ()=>{this.FlowDT.$graph.setMode('drg_add')}
                )
            },
        }
    }
</script>
