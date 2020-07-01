/**
 * 普通的节点
 * **/
import point from './common/point'
import setState from "./common/setState";
export default {
    options: {
        //定义normal_node节点的状态样式
        default: {
            //默认状态
            fill:'#f3f5f7',
            'point':{
                fill: '#ffffff',
                stroke: '#56acfc',
                lineWidth:0,
                r: 0,
            },
            'point_wrap':{
                r: 0,
                fill: '#ffffff',
                fillOpacity:0.5,
            }
        },
        'node_hover': {
            //鼠标滑入节点(和点击选中共用同一状态样式)
            fill:'#fdd594',
            stroke: '#fa9627',
            'point':{
                r: 4,
                lineWidth: 1,
                fill: '#ffffff',
                stroke: '#56acfc',
            },
            'point_wrap':{
                r: 12,
                fill: '#ffffff',
                fillOpacity:0.5,
            }
        },
        'lighten_point': {
            //点亮锚点的样式
            fill:'#fdd594',
            stroke: '#fa9627',
            'point':{
                r: 4,
                lineWidth: 1,
                fill: '#ffffff',
                stroke: '#56acfc',
            },
            'point_wrap':{
                r: 12,
                fill: '#ffffff',
                fillOpacity:0.5,
            }
        },
        selected: {},
    },
    getAnchorPoints() {
        //获取节点锚点
        return [
            [0.5, 0], //上
            [1, 0.5], //右
            [0.5, 1], //下
            [0, 0.5], //左
        ];
    },
    draw(cfg, group) {
        const keyShape = group.addShape('rect', {
            attrs: {
                x: -50,
                y: -30,
                width: 100,
                height: 60,
                radius:[5],
                fill: this.options.default.fill,
                fillOpacity:0.6,
                cursor:'pointer',
                name:"keyShape",
                describe:'keyShape',
            },
            name: 'keyShape',
            draggable: true
        });
        group.addShape('rect', {
            attrs: {
                x: -50,
                y: -30,
                width: 10,
                height: 60,
                radius:[5,0,0,5],
                fill: '#42b983',
                fillOpacity:0.6,
                cursor:'pointer',
                name:"keyShape",
                describe:'border_left',
            },
            name: 'border_left',
            draggable: true
        });
        point(group,[0,30], 'top', this.options);
        point(group,[0,-30], 'bottom', this.options);
        point(group,[-50,0], 'left', this.options);
        point(group,[50,0], 'right', this.options);
        group.addShape('text', {
            attrs: {
                x: 5, // 居中
                y: 0,
                text: cfg.label||"Normal",
                textAlign: 'center',
                textBaseline: 'middle',
                fill: '#000000',
                fontSize: 14,
                fontWeight: 400,
                describe:'text',
            },
            name: 'text',
            draggable: true
        });
        return keyShape;
    },
    shouldUpdate(type){
        return true
    },
    setState(name, value, item){
        setState(name, value, item, this.options)
    },
}
