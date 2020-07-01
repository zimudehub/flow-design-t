import point from './common/point'
import setState from "./common/setState";
export default {
    options: {
        //定义normal_node节点的状态样式
        default: {
            //默认状态
            fill:'#fff3ea',
            stroke: '#ffc26d',
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
        const keyShape = group.addShape('circle', {
            attrs: {
                x: 0,
                y: 0,
                r: 40,
                fill: this.options.default.fill,
                stroke: this.options.default.stroke,
                fillOpacity:0.6,
                lineWidth:2,
                cursor:'pointer',
                describe:'keyShape',
            },
            name: 'keyShape',
            draggable: true
        });
        point(group,[0,40], 'top', this.options);
        point(group,[0,-40], 'bottom', this.options);
        point(group,[-40,0], 'left', this.options);
        point(group,[40,0], 'right', this.options);
        group.addShape('text', {
            attrs: {
                text: cfg.label||"Start",
                x: 0,
                y: 0,
                fontSize: 14,
                textAlign: 'center',
                textBaseline: 'middle',
                fill: '#000000',
                fontWeight:400,
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
