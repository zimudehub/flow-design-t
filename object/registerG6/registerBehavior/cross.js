import { only } from '../../utils'
/**
 * 连线行为
 * **/
const cross = {
    targetItem: null,//缓存终止点
    getEvents() {
        return {
            'canvas:mouseleave': 'canvasMouseleave',
            'node:mouseenter': 'nodeMouseenter',
            mousemove: 'mousemove',
            mouseup: 'mouseup',
            'node:mouseleave': 'nodeMouseleave',
        };
    },
    nodeMouseleave(e) {
        const { graph } = this;
        const { item } = e;
        this.targetItem = null
    },
    nodeMouseenter(e) {
        const { item } = e;
        const { graph } = this;
        this.targetItem = item;
        //在鼠标进入节点的时候,将节点层级置于最上层,覆盖虚线,保证mouseup拿到的item是节点,而不是虚线
        item.toFront()
    },
    canvasMouseleave(e) {
        const { graph } = this;
        const item = graph.findById(graph.$FlowDT.id);
        graph.removeItem(item);
        this.lighten(false, graph);
        graph.setMode('default');
    },
    mousemove(e) {
        const { graph } = this;
        const x = e.x;
        const y = e.y;
        const item = graph.findById(graph.$FlowDT.id);
        graph.updateItem(item, {
            path:[
                ['M', graph.$FlowDT.startPoint[0], graph.$FlowDT.startPoint[1]],
                ['L', x, y],
            ]
        });
        //连线模式下,所有节点锚点亮起
        this.lighten(true, graph)

    },
    mouseup(e) {
        const { graph } = this;
        //松手时灭活hover节点样式
        if(graph.$FlowDT.sourceItem.getModel().id !== graph.$FlowDT.selectItem.getModel().id){
            //如果起始点不是被选中的节点,消除node_hover状态样式
            graph.setItemState(graph.$FlowDT.sourceItem, 'node_hover', false);
        }
        //删除虚线
        const item = graph.findById(graph.$FlowDT.id);
        graph.removeItem(item);
        //灭掉所有锚点
        this.lighten(false, graph);
        const shape = e.target;
        const className = shape.get('className')||'';
        const targetAnchor = this.getTargetAnchor(className);
        if (this.targetItem){
            if(!graph.$FlowDT.multitermLine){
                //是否两个节点可以连多条线
                if(!graph.save().edges.some((item)=>{
                    //判断图数据中是否有相同起始点和结束点的边
                    return item.source === graph.$FlowDT.sourceItem.getModel().id&&item.target === this.targetItem.getModel().id
                })){
                    //如果没有添加该条画的边
                    graph.$FlowDT.selectItem = graph.addItem('edge',{
                        id: only(),
                        //从通讯实例中拿到起始点和终止点id
                        source: graph.$FlowDT.sourceItem.getModel().id,
                        target: this.targetItem.getModel().id,
                        sourceAnchor: graph.$FlowDT.sourceAnchor,
                        targetAnchor,
                        type:'polyline'
                    });
                }
            }else {
                graph.$FlowDT.selectItem = graph.addItem('edge',{
                    id: only(),
                    source: graph.$FlowDT.sourceItem.getModel().id,
                    target: this.targetItem.getModel().id,
                    sourceAnchor: graph.$FlowDT.sourceAnchor,
                    targetAnchor,
                    type:'polyline'
                });
            }
        }
        graph.setMode('default')
    },
    lighten(SW, graph) {
        //点亮连接锚点函数
        if (SW){
            graph.get("group").findAll((item)=>{
                return item.attr('describe') === 'point'
            }).forEach((item)=>{
                item.attr({
                    r: 4,
                    lineWidth: 1,
                })
            });
            graph.get("group").findAll((item)=>{
                return item.attr('describe') === 'point-wrap'
            }).forEach((item)=>{
                item.attr({
                    r: 12,
                    fill: '#94d5fd'
                })
            })
        }else {
            //这设计的有问题,锚点的样式应该开一个state管理
            //这为了方便选直接修改了锚点的样式
            //因为G6内置的setItemState如果两次传参相同的话第二次不会生效(这里向g6官方提了issues)
            graph.setItemState(graph.$FlowDT.selectItem, 'node_hover', false);
            graph.get("group").findAll((item)=>{
                return item.attr('describe') === 'point'
            }).forEach((item)=>{
                item.attr({
                    r: 0,
                    lineWidth: 0,
                    fill: '#ffffff'
                })
            });
            graph.get("group").findAll((item)=>{
                return item.attr('describe') === 'point-wrap'
            }).forEach((item)=>{
                item.attr({
                    r: 0,
                    fill: '#ffffff'
                })
            });
            graph.setItemState(graph.$FlowDT.selectItem, 'node_hover', true);
        }
    },
    getTargetAnchor(className) {
        switch (className) {
            case 'anchorPoint-wrap-right':
                return 1;
            case  'anchorPoint-wrap-left':
                return 3;
            case  'anchorPoint-wrap-bottom':
                return 0;
            case  'anchorPoint-wrap-top':
                return 2;
            case 'anchorPoint-right':
                return 1;
            case  'anchorPoint-left':
                return 3;
            case  'anchorPoint-bottom':
                return 0;
            case  'anchorPoint-top':
                return 2;
        }
    },
};

export default cross
