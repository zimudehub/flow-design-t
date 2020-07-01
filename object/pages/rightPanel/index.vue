<template>
    <div class="panel-right-wrap">
        <p class="node_id">{{ a === ''?'当前没有选中节点' : a }}</p>
        <slot name="node" v-if="showModel === 'node'"></slot>
        <slot name="edge" v-else-if="showModel === 'edge'"></slot>
    </div>
</template>

<script>
    export default {
        name: "RightPanel",
        inject:['FlowDT'],
        props:{

        },
        computed:{
            a(){
                let a = '';
                if (this.FlowDT.selectItem){
                    a = this.FlowDT.selectItem.getModel().id
                }
                return a
            },
            showModel(){
                if(this.FlowDT.selectItem){
                    return this.FlowDT.selectItem.getType()
                }
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
