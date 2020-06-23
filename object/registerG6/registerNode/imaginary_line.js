/**
 * 定义画线用的虚线
 * **/

export default {
    draw(cfg, group) {
        return group.addShape('path', {
            attrs: {
                stroke: '#1c92ff',
                path: cfg.path,
                lineDash: [4, 4]
            },
            name: 'line-shape',
        });
    },
}
