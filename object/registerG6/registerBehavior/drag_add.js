import { G6global } from '../../common/G6global'
import { only } from '../../utils'
const drg_add = {
    shape: null,
    getEvents() {
        return {
            'canvas:mouseenter': 'mouseenter',
            mousemove: 'mousemove',
            'canvas:mouseleave': 'mouseleave',
            mouseup:'mouseup',
        };
    },
    mouseenter(e){
        const { graph, shape } = this;
        if (shape) return;
        const Group = graph.get("group");
        const size = G6global.size;

        let width = 0;
        let height = 0;

        if (Object.prototype.toString.call(size)==='[object Array]') {
            width = size[0];
            height = size[1];
        } else {
            width = size;
            height = size;
        }

        const x = e.x-width/2;
        const y = e.y-height/2;

        this.shape = Group.addShape('rect',{
            attrs: {
                x,
                y,
                width,
                height,
                fill: '#f3f9ff',
                fillOpacity: 0.5,
                stroke: '#1890ff',
                strokeOpacity: 0.9,
                lineWidth:0.5,
                lineDash: [1, 1],
                radius:[2.5]
            },
        });
        graph.paint();
    },
    mouseleave(e) {
        const { graph } = this;
        graph.setMode('default');
        this.shape.remove(true);
    },
    mousemove(e) {
        const { graph  } = this;
        const { width, height } = this.shape.getBBox();

        const x = e.x-width / 2;
        const y = e.y-height / 2;

        this.shape.attr({
            x,
            y,
        });

        graph.paint();
    },
    mouseup(e) {
        const { graph } = this;
        this.shape.remove(true);
        const size = G6global.size;
        const x = e.x;
        const y = e.y;
        graph.add('node',{
            id: only(),
            x,
            y,
            type: 'start_node' ,
            size
        });
        graph.setMode('default');
    },
};

export default drg_add
