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
    },
    mouseup(e) {
        const { graph } = this;
        //重新激活选中节点的node_hover样式,消除掉被点击画线的锚点中心点是蓝色问题
        graph.setItemState(graph.$FlowDT.sourceItem, 'node_hover', false);
        graph.setItemState(graph.$FlowDT.sourceItem, 'node_hover', true);
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
        const targetAnchor = this.getTargetAnchor(className, e.x, e.y, e.item);
        if (this.targetItem&&this.targetItem._cfg!==null&&[0,1,2,3].includes(targetAnchor)){
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
                        label:'next',
                        data:{}
                    });
                    graph.$FlowDT.selectItem.refresh()
                }
            }else {
                graph.$FlowDT.selectItem = graph.addItem('edge',{
                    id: only(),
                    source: graph.$FlowDT.sourceItem.getModel().id,
                    target: this.targetItem.getModel().id,
                    sourceAnchor: graph.$FlowDT.sourceAnchor,
                    targetAnchor,
                    label:'next',
                    data:{}
                });
                graph.$FlowDT.selectItem.refresh()
            }
        }
        graph.setMode('default')
    },
    lighten(SW, graph) {
        //点亮连接锚点函数(只点亮非选中节点的锚点,因为选中节点的锚点本身就是点亮的)
        graph.find('node', node => {
            if (node !== graph.$FlowDT.selectItem){
                graph.setItemState(node, 'lighten_point', SW)
            }
        });

    },
    getTargetAnchor(className, x, y, item) {
        const pointArr = [
            'anchorPoint-wrap-right',
            'anchorPoint-wrap-left',
            'anchorPoint-wrap-bottom',
            'anchorPoint-wrap-top',
            'anchorPoint-left',
            'anchorPoint-top',
            'anchorPoint-bottom',
            'anchorPoint-right',
        ];
        if(pointArr.includes(className)){
            //事件响应在4个点上才触发
            const startPoint = item.getLinkPoint({x,y});
            return startPoint.anchorIndex
        }
    },
};

export default cross
