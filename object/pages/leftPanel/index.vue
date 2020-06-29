<template>
    <ul class="node-model">
        <li class="t_start"
            @mousedown="mousedown('start_node')"
            @mouseup="mouseup"
        >Start</li>
        <li class="t_normal"
            @mousedown="mousedown('normal_node')"
            @mouseup="mouseup"
        ><span class="iconfont">&#xe614;</span></li>
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
                //保存拖拽节点的类型传递给drag_add交互行为
                this.FlowDT.dragType = type;
                this.$nextTick(
                    ()=>{this.FlowDT.$graph.setMode('drg_add')}
                )
            },
        }
    }
</script>
