import { only } from '../../utils'
const node_hover = {
    getEvents() {
        return {
            'node:mouseenter': 'nodeMouseenter',
            'node:mouseleave': 'nodeMouseleave',
            'node:mousemove': 'nodeMousemove',
            'node:mousedown': 'nodeMousedown'
        };
    },
    nodeMousedown(e) {
        //获取起始点
        const { item } = e;
        const shape = e.target;
        const className = shape.get('className')||'';
        const { graph } = this;
        const startPoint = this.getStartPoint(className, item.getModel().x, item.getModel().y, graph);
        if (startPoint){
            //这里在graph.$FlowDT下挂载一些数据交给cross交互行为做连线操作
            graph.$FlowDT.startPoint = startPoint;
            //保存起始点
            graph.$FlowDT.sourceItem = item;
            const id = only();
            //保存虚线id
            graph.$FlowDT.id = id;
            graph.add('node',{
                id,
                path:[
                    ['M', startPoint[0], startPoint[1]],
                    ['L', startPoint[0], startPoint[1]],
                ],
                type: 'imaginary_line'
            });
            //切换到cross模式
            graph.setMode('cross')
        }
    },
    nodeMousemove(e) {
        //当鼠标在节点中anchorPoint-wrap图形上移动时改变样式
        const { item } = e;
        const shape = e.target;
        const group = item.getContainer();
        group.findAll(function(item) {
            return item.attr('describe') === 'point';
        }).forEach((shape, i)=>{
            shape.attr('fill','#ffffff');
        });
        const className = shape.get('className');
        this.changeColor(className, '#56acfc', shape, group)
    },
    nodeMouseenter(e) {
        e.preventDefault();
        if (!this.shouldUpdate.call(this, e)) {
            return;
        }
        const { item } = e;
        const graph = this.graph;
        graph.setItemState(item, 'node_hover', true);
    },
    nodeMouseleave(e) {
        e.preventDefault();
        if (!this.shouldUpdate.call(this, e)) {
            return;
        }
        const { item } = e;
        const graph = this.graph;
        const group = item.getContainer();
        group.findAll(function(item) {
            return item.attr('describe') === 'point';
        }).forEach((shape, i)=>{
            shape.attr('fill','#ffffff');
        });
        graph.setItemState(item, 'node_hover', false);
    },
    getStartPoint(className, x, y, graph) {
        switch (className) {
            case 'anchorPoint-wrap-right':
                //保存起始连接点所索引sourceAnchor
                graph.$FlowDT.sourceAnchor = 1;
                return [40+x, 0+y];
            case  'anchorPoint-wrap-left':
                graph.$FlowDT.sourceAnchor = 3;
                return [-40+x, 0+y];
            case  'anchorPoint-wrap-bottom':
                graph.$FlowDT.sourceAnchor = 0;
                return [0+x, -40+y];
            case  'anchorPoint-wrap-top':
                graph.$FlowDT.sourceAnchor = 2;
                return [0+x, 40+y];
            case 'anchorPoint-right':
                graph.$FlowDT.sourceAnchor = 1;
                return [40+x, 0+y];
            case  'anchorPoint-left':
                graph.$FlowDT.sourceAnchor = 3;
                return [-40+x, 0+y];
            case  'anchorPoint-bottom':
                graph.$FlowDT.sourceAnchor = 0;
                return [0+x, -40+y];
            case  'anchorPoint-top':
                graph.$FlowDT.sourceAnchor = 2;
                return [0+x, 40+y];
        }
    },
    changeColor(className, color, shape, group) {
        //这个思路有待改进,代码臃肿
        switch (className) {
            case 'anchorPoint-wrap-right':
                group.find(function(item) {
                    return item.attr('name') === 'anchorPoint-right';
                }).attr('fill',color);
                break;
            case  'anchorPoint-wrap-left':
                group.find(function(item) {
                    return item.attr('name') === 'anchorPoint-left';
                }).attr('fill',color);
                break;
            case  'anchorPoint-wrap-bottom':
                group.find(function(item) {
                    return item.attr('name') === 'anchorPoint-bottom';
                }).attr('fill',color);
                break;
            case  'anchorPoint-wrap-top':
                group.find(function(item) {
                    return item.attr('name') === 'anchorPoint-top';
                }).attr('fill',color);
                break;
            case 'anchorPoint-right':
                group.find(function(item) {
                    return item.attr('name') === 'anchorPoint-right';
                }).attr('fill',color);
                break;
            case  'anchorPoint-left':
                group.find(function(item) {
                    return item.attr('name') === 'anchorPoint-left';
                }).attr('fill',color);
                break;
            case  'anchorPoint-bottom':
                group.find(function(item) {
                    return item.attr('name') === 'anchorPoint-bottom';
                }).attr('fill',color);
                break;
            case  'anchorPoint-top':
                group.find(function(item) {
                    return item.attr('name') === 'anchorPoint-top';
                }).attr('fill',color);
                break;
        }
    },
};

export default node_hover
