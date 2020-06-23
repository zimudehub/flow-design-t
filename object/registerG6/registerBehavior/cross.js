import { only } from '../../utils'
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
        graph.setItemState(graph.$FlowDT.sourceItem, 'node_hover', false);
        const item = graph.findById(graph.$FlowDT.id);
        graph.removeItem(item);
        this.lighten(false, graph);
        const shape = e.target;
        const className = shape.get('className')||'';
        const targetAnchor = this.getTargetAnchor(className);
        // console.log(this.targetItem.getLinkPointByAnchor(0))
        if (this.targetItem){
            graph.addItem('edge',{
                id: only(),
                //从通讯实例中拿到起始点和终止点id
                source: graph.$FlowDT.sourceItem.getModel().id,
                target: this.targetItem.getModel().id,
                sourceAnchor: graph.$FlowDT.sourceAnchor,
                targetAnchor,
                type:'polyline'
            });
        }
        graph.setMode('default')
    },
    lighten(SW, graph) {
        //点亮连接锚点
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
            })
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
