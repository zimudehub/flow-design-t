/**
 * 定义画线用的虚线(这里虚线的类型是'node'不是'edge')
 * **/

export default {
    draw(cfg, group) {
        return group.addShape('path', {
            attrs: {
                stroke: '#1c92ff',
                path: cfg.path,
                lineDash: [4, 4],
                name: 'line-shape',
            },
            name: 'line-shape',
        });
    },
}
