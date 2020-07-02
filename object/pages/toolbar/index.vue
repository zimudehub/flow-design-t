<template>
    <div class="toolbar-wrap">
        <el-tooltip class="item" effect="dark" content="Delete" placement="top-start">
            <el-button
                icon="el-icon-delete"
                :disabled="selectItem === ''"
                circle
                size="mini"
                @click="deleteItem"
            />
        </el-tooltip>
        <el-divider direction="vertical"></el-divider>
        <el-tooltip class="item" effect="dark" content="Zoom In" placement="top-start">
            <el-button
                icon="el-icon-zoom-in"
                :disabled="zoom >= 1.8"
                circle
                size="mini"
                @click="zoomIn"
            />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Zoom Out" placement="top-start">
            <el-button
                icon="el-icon-zoom-out"
                :disabled="zoom <= 0.3"
                circle
                size="mini"
                @click="zoomOut"
            />
        </el-tooltip>
        <el-divider direction="vertical"></el-divider>
        <el-tooltip class="item" effect="dark" content="Copy" placement="top-start">
            <el-button
                icon="el-icon-document-copy"
                :disabled="showCopy"
                circle
                size="mini"
                @click="copy"
            />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Paste" placement="top-start">
            <el-button
                icon="el-icon-document-add"
                circle
                size="mini"
                @click="paste"
            />
        </el-tooltip>
        <el-divider direction="vertical"></el-divider>
        <el-tooltip class="item" effect="dark" content="Actual Size" placement="top-start">
            <el-button
                icon="el-icon-c-scale-to-original"
                circle
                size="mini"
                @click="actualSize"
            />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Save Data" placement="top-start">
            <el-button
                icon="el-icon-document-checked"
                circle
                size="mini"
                @click="save"
            />
        </el-tooltip>
    </div>
</template>

<script>
    import {only} from "../../utils";
    export default {
        name: "Toolbar",
        inject:['FlowDT'],
        props:{
            selectItem:{
                required: true
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
        data(){
            return{
                zoom:1,
                copyItem:'',
            }
        },
        computed:{
            showCopy(){
                return !(this.selectItem&&this.selectItem.getType() === 'node')
            }
        },
        methods:{
            copy(){
                //只有在有选中节点并且节点类型为node时生效由showCopy属性控制按钮是否禁用
                this.copyItem = this.selectItem.getModel();
            },
            paste(){
                if (this.copyItem === '')return;
                this.$nextTick(()=>{
                    this.FlowDT.$graph.add('node', {
                        ...this.copyItem,
                        id: only(),
                        x: this.copyItem.x+20,
                        y: this.copyItem.y+20
                    });
                })
            },
            save(){
                //保存
               this.$nextTick(()=>{
                   //点击保存时要将最后一次被选中的节点数据更新
                   if (this.selectItem){
                       //只有当前节点有值的时候需要保存,没有当前选中节点时说明所有节点已经都被更新
                       const Type = this.selectItem.getType();
                       if (Type === "node"){
                           this.FlowDT.$graph.updateItem(this.selectItem, {
                               label: this.nodeModel.label,
                               data:{
                                   ...this.nodeModel
                               }
                           });
                       }
                       if(Type === 'edge'){
                           this.FlowDT.$graph.updateItem(this.selectItem, {
                               label: this.edgeModel.label,
                               data:{
                                   ...this.edgeModel
                               }
                           });
                       }
                   }
                   this.FlowDT.$emit('save', this.FlowDT.$graph.save());
               })
            },
            actualSize(){
                this.zoom = 1;
                this.$nextTick(()=>{
                    //用nextTick是因为this.FlowDT.$graph是在mounted周期中赋值的
                    this.FlowDT.$graph.zoomTo(this.zoom);
                });
            },
            zoomIn(){
                this.zoom += 0.1;
                this.$nextTick(()=>{
                    this.FlowDT.$graph.zoomTo(this.zoom);
                });
            },
            zoomOut(){
                this.zoom -= 0.1;
                this.$nextTick(()=>{
                    this.FlowDT.$graph.zoomTo(this.zoom);
                });
            },
            deleteItem() {
                this.$nextTick(()=>{
                    const nodeType = this.selectItem.getType();
                    if (nodeType === 'edge') {
                        this.FlowDT.$graph.remove(this.selectItem);
                        this.FlowDT.selectItem = ''
                    } else if (nodeType === 'node') {
                        //找到当前节点所有关联边,并且移除
                        this.selectItem.getEdges().forEach((edge) => {
                            this.FlowDT.$graph.remove(edge)
                        });
                        //然后移除掉当前节点
                        this.FlowDT.$graph.remove(this.selectItem);
                        this.FlowDT.selectItem = ''
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
