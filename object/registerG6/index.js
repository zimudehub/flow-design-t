import {
    start_node,
    imaginary_line
} from './registerNode'
import {
    drg_add,
    node_hover,
    cross
} from './registerBehavior'

import G6 from "@antv/g6/lib/index";
/*定义自定义节点*/
G6.registerNode("start_node", start_node, 'rect');
G6.registerNode("imaginary_line", imaginary_line);

/*定义自定义交互行为*/
G6.registerBehavior("drg_add", drg_add);
G6.registerBehavior("node_hover", node_hover);
G6.registerBehavior("cross", cross);

export default G6
