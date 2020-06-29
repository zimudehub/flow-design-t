export default function setState(name, value, item, options = {}){
    const group = item.getContainer();
    if (name === 'node_hover'){
        if(value){
            group.get('children').forEach((shape, i)=>{
                //获取图形标识,根据标识修改样式
                const describe = shape.attr('describe');
                if (describe === 'keyShape'){
                    shape.attr({
                        fill: options.node_hover.fill,
                        stroke: options.node_hover.stroke,
                    })
                }else if(describe === 'point'){
                    shape.attr({
                        ...options.node_hover.point
                    })
                }else if (describe === 'point_wrap') {
                    shape.attr({
                        ...options.node_hover.point_wrap
                    })
                }
            })
        }else {
            group.get('children').forEach((shape, i)=>{
                const describe = shape.attr('describe');
                if (describe === 'keyShape'){
                    shape.attr({
                        fill: options.default.fill,
                        stroke: options.default.stroke,
                    })
                }else if(describe === 'point'){
                    shape.attr({
                        ...options.default.point
                    })
                }else if(describe === 'point_wrap'){
                    shape.attr({
                        ...options.default.point_wrap
                    })
                }
            })
        }
    }
    if (name === 'lighten_point'){
        if(value){
            group.get('children').forEach((shape, i)=>{
                const describe = shape.attr('describe');
                if (describe === 'keyShape'){

                }else if(describe === 'point'){
                    shape.attr({
                        ...options.lighten_point.point
                    })
                }else if (describe === 'point_wrap'){
                    shape.attr({
                        ...options.lighten_point.point_wrap
                    })
                }
            })
        }else {
            group.get('children').forEach((shape, i)=>{
                const describe = shape.attr('describe');
                if (describe === 'keyShape'){

                }else if(describe === 'point'){
                    shape.attr({
                        ...options.default.point
                    })
                }else if(describe === 'point_wrap'){
                    shape.attr({
                        ...options.default.point_wrap
                    })
                }
            })
        }
    }
}
