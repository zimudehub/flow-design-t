export default function point(group, position, pdec, options){
    //name和describe都作为寻找图形的标识
    group.addShape('circle',{
        attrs: {
            x: position[0],
            y: position[1],
            ...options.default.point_wrap,
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
            ...options.default.point,
            cursor:'crosshair',
            name:`anchorPoint-${pdec}`,
            describe:'point'
        },
        name: 'anchorPoint',
        visible: true
    }).set('className', `anchorPoint-${pdec}`);
}
