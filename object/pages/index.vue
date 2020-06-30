<template>
    <div class="flow-design-wrap">
        <header class="button-control">
            <Toolbar
                :selectItem="selectItem"
            >
            </Toolbar>
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
                <RightPanel>
                    <template v-slot:edge>
                        <slot name="edge"></slot>
                    </template>
                    <template v-slot:node>
                        <slot name="node"></slot>
                    </template>
                </RightPanel>
            </aside>
        </content>
    </div>
</template>

<script>
    import CanvasPanel from "./canvasPanel"
    import LeftPanel from "./leftPanel"
    import RightPanel from "./rightPanel"
    import Toolbar from "./toolbar"
    export default {
        name: "FlowDesignTCD",
        provide(){
            return{
                FlowDT: this
            }
        },
        components:{CanvasPanel, LeftPanel, RightPanel, Toolbar},
        props:{
            multitermLine:{
                type: Boolean,
                default: false
            },
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
                selectItem: '',//被选中的节点
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
        watch:{
            selectItem:{
                handler(newValue, oldValue){
                    //监听selectItem,切换选中的节点样式
                    if (newValue !== ''){
                        this.$nextTick(()=>{
                            if (oldValue !== ''){
                                const newType = newValue.getType();
                                const oldType = oldValue.getType();
                                newType === 'node'?
                                    this.$graph.setItemState(newValue, 'node_hover', true)
                                    :this.$graph.setItemState(newValue, 'select', true);
                                oldType === 'node'?
                                    this.$graph.setItemState(oldValue, 'node_hover', false)
                                    :this.$graph.setItemState(oldValue, 'select', false);
                            }
                        })
                    }
                },
            }
        }
    }
</script>

<style scoped>

</style>
