import {
    start_node,
    point_circle
} from './registerNode'
import {
    drg_add,
    node_hover
} from './registerBehavior'

import G6 from "@antv/g6";
/*定义自定义节点*/
G6.registerNode("point_circle", point_circle);
G6.registerNode("start_node", start_node);

/*定义自定义交互行为*/
G6.registerBehavior("drg_add", drg_add);
G6.registerBehavior("node_hover", node_hover);

export default G6
