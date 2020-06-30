<template>
    <div class="panel-right-wrap">
        <p class="node_id">{{ a === ''?'当前没有选中节点' : a }}</p>
        <slot name="node"></slot>
        <slot name="edge"></slot>
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
                    // console.log(this.FlowDT.selectItem.getModel())
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
