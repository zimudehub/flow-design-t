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
        <el-tooltip class="item" effect="dark" content="Actual Size" placement="top-start">
            <el-button
                icon="el-icon-full-screen"
                circle
                size="mini"
                @click="actualSize"
            />
        </el-tooltip>
    </div>
</template>

<script>
    export default {
        name: "Toolbar",
        inject:['FlowDT'],
        props:{
            selectItem:{
                required: true
            },
        },
        data(){
            return{
                zoom:1,
            }
        },
        methods:{
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
                        this.FlowDT.$graph.remove(this.selectItem)
                        this.FlowDT.selectItem = ''
                    } else if (nodeType === 'node') {
                        //找到当前节点所有关联边,并且移除
                        this.selectItem.getEdges().forEach((edge) => {
                            this.FlowDT.$graph.remove(edge)
                        });
                        //然后移除掉当前节点
                        this.FlowDT.$graph.remove(this.selectItem)
                        this.FlowDT.selectItem = ''
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
