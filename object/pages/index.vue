<template>
    <div class="flow-design-wrap">
        <header class="button-control">
            <Toolbar
                :selectItem = "selectItem"
                :nodeModel = "nodeModel"
                :edgeModel = "edgeModel"
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
                    :minimap="minimap"
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
            multitermLine: {
                type: Boolean,
                default: true
            },
            minimap:{
                type: Boolean,
                default: true
            },
            data:{
                type: Object,
                default: ()=>({})
            },
            leftWidth: {
                type: String,
                default: "150px"
            },
            rightWidth: {
                type: String,
                default: "350px"
            },
            nodeModel: {//被选中节点数据
                type: Object,
                default: ()=>({})
            },
            edgeModel: {//被选中边数据
                type: Object,
                default: ()=>({})
            }
        },
        created(){
            //将添加的新节点的数据格式保存
            this.node = JSON.parse(JSON.stringify(this.nodeModel));
            this.edge = JSON.parse(JSON.stringify(this.edgeModel))
        },
        data(){
            return{
                dragType:'',
                selectItem: '',//被选中的节点
                node:{},
                edge:{},
                changePath:[],//保存每次图变化时的数据副本的数组(提供一个路径类似于git的版本管理)
            }
        },
        watch:{
            selectItem:{
                handler(newValue, oldValue){
                    if (newValue !== ''){
                        this.$nextTick(()=>{
                            //当selectItem变化时将selectItem的Model传给父组件
                            if(oldValue !== ''){
                                const oldType = oldValue.getType();
                                const newType = newValue.getType();
                                const Model = JSON.parse(JSON.stringify(newValue.getModel()));
                                if (oldType === 'node'){
                                    //先将nodeModel或edgeModel保存给之前selectItem
                                    this.$graph.updateItem(oldValue, {
                                        label: this.nodeModel.label,
                                        data:{
                                            ...this.nodeModel
                                        }
                                    });
                                }
                                if(oldType === 'edge'){
                                    this.$graph.updateItem(oldValue, {
                                        label: this.edgeModel.label,
                                        data:{
                                            ...this.edgeModel
                                        }
                                    });
                                }
                                if (newType === 'node'){
                                    //将当前selectItem的Model的data传给父组件
                                    this.$emit('update:nodeModel', {
                                        ...Model.data,
                                    });
                                }
                                if(newType === 'edge'){
                                    this.$emit('update:edgeModel', {
                                        ...Model.data,
                                    });
                                }
                            }
                        });
                        //监听selectItem,切换选中的节点样式
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
