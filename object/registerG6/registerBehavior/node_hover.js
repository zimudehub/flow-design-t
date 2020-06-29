import { only } from '../../utils'
const node_hover = {
    getEvents() {
        return {
            'node:mouseenter': 'nodeMouseenter',
            'node:mouseleave': 'nodeMouseleave',
            'node:mousemove': 'nodeMousemove',
            'node:mousedown': 'nodeMousedown',
            'node:click': 'onclick',
            'edge:click': 'onclick'
        };
    },
    onclick(e) {
        const { item } = e;
        const graph = this.graph;
        const nodeType = item.getType();
        if(nodeType === 'node'){
            graph.$FlowDT.selectItem = item;
        }else if(nodeType === 'edge'){
            graph.$FlowDT.selectItem = item;
            item.setState('select', false);
            item.setState('select', true);
        }
        //将当前点击的item赋值给graph.$FlowDT.selectItem
    },
    nodeMousedown(e) {
        //获取起始点
        const { item } = e;
        const shape = e.target;
        const className = shape.get('className')||'';
        const { graph } = this;
        const startPoint = this.getStartPoint(className, e.x, e.y, graph, item);
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
            this.lighten(true, graph, item);
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
        if (item !== graph.$FlowDT.selectItem){
            graph.setItemState(item, 'node_hover', false);
        }
    },
    lighten(SW, graph, item) {
        //点亮连接锚点函数(只点亮非选中节点的锚点和不在鼠标下的节点,因为二者节点的锚点本身就是点亮的)
        graph.find('node', node => {
            if (node !== graph.$FlowDT.selectItem&&node!==item){
                graph.setItemState(node, 'lighten_point', SW)
            }
        });
    },
    getStartPoint(className, x, y, graph, item) {
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
            graph.$FlowDT.sourceAnchor = startPoint.anchorIndex;
            return [startPoint.x, startPoint.y]
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
