<template>
    <div class="flow-design-wrap">
        <header class="button-control">

        </header>
        <content class="panel">
            <aside class="panel-left" :style="`min-width:${leftWidth}`">
                <LeftPanel/>
            </aside>
            <content class="panel-canvas-wrap">
                <CanvasPanel
                    :data="data"
                />
            </content>
            <aside class="panel-right" :style="`min-width:${rightWidth}`">

            </aside>
        </content>
    </div>
</template>

<script>
    import CanvasPanel from "./canvasPanel"
    import LeftPanel from "./leftPanel"
    import RightPanel from "./rightPanel"
    export default {
        name: "FlowDesignTCD",
        provide(){
            return{
                FlowDT: this
            }
        },
        components:{CanvasPanel, LeftPanel, RightPanel},
        props:{
            leftWidth:{
                type: String,
                default: "150px"
            },
            rightWidth:{
                type: String,
                default: "250px"
            }
        },
        data(){
            return{
                dragType:'',
                data:{
                    id:'',
                    name:'',
                    v:'',
                    cl:'',
                    nodes: [
                        // {
                        //     id: 'node1',
                        //     x: 100,
                        //     y: 200,
                        //     size:100,

                        // },
                        // { id: 'node3', x: 250, y: 220, color: 'red', type: 'start_node' }, // 添加颜色
                        // {
                        //     id: 'node2',
                        //     x: 200,
                        //     y: 200,
                        // },
                    ],
                    edges: [
                        // {
                        //     source: 'node1',
                        //     target: 'node2',
                        // },
                    ],
                    someDataElse:{

                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>
