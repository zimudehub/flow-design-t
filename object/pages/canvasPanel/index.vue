<template>
    <div id="panel-canvas" :ref="'canW'">

    </div>
</template>

<script>
    export default {
        name: "CanvasPanel",
        inject:['FlowDT'],
        props: {
            data: {
                type: Object,
                required: true
            },
            minimap:{
                type: Boolean,
                default: true
            }
        },
        mounted() {
            const plugins = [];
            if (this.minimap){
                const minimap = new this.G6.Minimap({
                    size: [200, 200],
                    className: 'minimap',
                    type:"default"
                });
                plugins.push(minimap)
            }
            const width = document.getElementById("panel-canvas").getBoundingClientRect().width;
            const height = document.getElementById("panel-canvas").getBoundingClientRect().height;
            this.FlowDT.$graph = new this.G6.Graph({
                plugins,
                modes: {
                    default: [
                        'drag-canvas',
                        'node_hover',
                        {
                            type: 'drag-node',
                            enableDelegate: true,
                        },
                    ],
                    cross: ['cross'],//画线模式
                    drg_add: ['drg_add'],//拖拽添加节点模式
                    paste:['paste'],//粘贴模式
                },
                fitView: true,
                fitViewPadding: [20, 20, 20, 20],
                autoPaint:true,
                container: 'panel-canvas',
                width: width,
                height: height,
                defaultEdge: {
                    type:'polyline',
                    labelCfg:{
                        refY:14,
                        style:{
                            fontSize: 12,
                            fontWeight: 500,
                        },
                    },
                    style: {
                        endArrow: {
                            path: 'M 0,0 L 6,3 L 6,-3 Z',
                            fill: '#adb9c6',
                            stroke: '#adb9c6',
                            opacity: 0.8,
                        },
                        stroke: '#adb9c6',
                        lineWidth: 2,
                        radius: 5,
                        offset: 18,
                        cursor:'pointer',
                    },
                },
                edgeStateStyles: {
                    'select':{
                        stroke: '#1890ff',
                        lineWidth: 4,
                    }
                },
            });
            /**
             * 这里在实例化的G6对象下挂一个指针$FlowDT,指向FlowDT,利用vue的响应式原理和js引用类型数据的特性
             * 把this.FlowDT.$graph下的$FlowDT作为G6实例对象和vue的FlowDT组件对象的通讯基站(方便自定义交互行为修改数据)
             * 在用这个方法之前,有考虑过使用eventBus方案和内置一个通讯类使用实例化的通讯类的方案,但是会使代码变的臃肿,而vuex会增加项目体积,因为需要通讯的数据不会很多,用不到vuex那么多功能
             * 也考虑到FlowDT相当于整个项目的根,由它向所有的子集传递了数据,所以使用此方案(缺点可能造成数据混乱,数据流难以定位)
             * **/
            this.FlowDT.$graph.$FlowDT = this.FlowDT;
            this.FlowDT.$graph.data(this.data);
            this.FlowDT.$graph.render();
            //下面调用避免画布出现重影
            this.FlowDT.$graph.get('canvas').set('localRefresh', false);
            addEventListener('resize',()=>{
                //监听视口变化改变画布尺寸
                const width =  document.getElementById("panel-canvas").getBoundingClientRect().width;
                const height =  document.getElementById("panel-canvas").getBoundingClientRect().height;
                this.FlowDT.$graph.changeSize(width, height);
            });
            addEventListener('mouseup',()=>{
                this.FlowDT.$graph.setMode('default')
            });
            this.$on("hook:destroyed",()=>{
                //使用hock撤销监听
                removeEventListener('mouseup',()=>{
                    this.FlowDT.$graph.setMode('default')
                });
                removeEventListener('resize',()=>{
                    const width =  document.getElementById("panel-canvas").getBoundingClientRect().width;
                    const height =  document.getElementById("panel-canvas").getBoundingClientRect().height;
                    this.FlowDT.$graph.changeSize(width, height);
                });
            })
        },
    }
</script>
