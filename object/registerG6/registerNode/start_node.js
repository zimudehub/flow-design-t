export default {
    options: {
        style: {
            fill:'#fff3ea',
            stroke: '#ffc26d',
            'point':{
                r: 0,
                lineWidth: 0,
            },
        },
        stateStyles: {
            'node_hover':{
                fill:'#fdd594',
                stroke: '#fa9627',
                'point':{
                    r: 4,
                    lineWidth: 1,
                }
            },
            selected: {},
        },
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
                fill: this.options.style.fill,
                stroke: this.options.style.stroke,
                fillOpacity:0.6,
                lineWidth:2,
                cursor:'pointer',
                name:"start_keyShape"
            },
            name: 'start_keyShape',
            draggable: true
        });
        this.point(group,[0,40], 'top');
        this.point(group,[0,-40], 'bottom');
        this.point(group,[-40,0], 'left');
        this.point(group,[40,0], 'right');
        if (cfg.label) {
            // 如果有文本
            // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
            // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
            // style.text = cfg.label;
            const label = group.addShape('text', {
                // attrs: style
                attrs: {
                    x: 0, // 居中
                    y: 0,
                    textAlign: 'center',
                    textBaseline: 'middle',
                    text: cfg.label,
                    fill: '#666',
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: 'text-shape',
                // 设置 draggable 以允许响应鼠标的图拽事件
                draggable: true
            });
        }
        return keyShape;
    },
    shouldUpdate(type){
        return true
    },
    setState(name, value, item){
        const group = item.getContainer();
        if (name === 'node_hover'){
            if(value){
                group.get('children').forEach((shape, i)=>{
                    if (i===0){
                        shape.attr({
                            fill: this.options.stateStyles.node_hover.fill,
                            stroke: this.options.stateStyles.node_hover.stroke,
                        })
                    }else if(i%2 === 0){
                        shape.attr({
                            r: 4,
                            lineWidth: 1,
                            fill: '#ffffff',
                            stroke: '#56acfc',
                            fillOpacity:1,
                        })
                    }else {
                        shape.attr({
                            r: 12,
                            fill: '#ffffff',
                            fillOpacity:0.5,
                        })
                    }
                })
            }else {
                group.get('children').forEach((shape, i)=>{
                    if (i===0){
                        shape.attr({
                            fill: this.options.style.fill,
                            stroke: this.options.style.stroke,
                        })
                    }else {
                        shape.attr({
                            r: 0,
                            lineWidth: 0,
                        })
                    }
                })
            }
        }
    },
    point(group, position, pdec){
        //name和describe都作为寻找图形的标识
        group.addShape('circle',{
            attrs: {
                x: position[0],
                y: position[1],
                r: 12,
                fill: '#ffffff',
                fillOpacity:0.5,
                cursor:'crosshair',
                name:`anchorPoint-wrap-${pdec}`,
                describe:'point-wrap',
            },
            name: 'anchorPoint-wrap',
            visible: true
        }).set('className', `anchorPoint-wrap-${pdec}`);
        group.addShape('circle', {
            attrs: {
                x: position[0],
                y: position[1],
                r: 0,
                fill: '#ffffff',
                stroke: '#56acfc',
                fillOpacity:1,
                lineWidth:0,
                cursor:'crosshair',
                name:`anchorPoint-${pdec}`,
                describe:'point'
            },
            name: 'anchorPoint',
            visible: true
        }).set('className', `anchorPoint-${pdec}`);
    }
}
