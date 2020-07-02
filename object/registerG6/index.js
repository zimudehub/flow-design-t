import {
    start_node,
    imaginary_line,
    normal_node,
    exigency_node,
    end_node,
    warning_node
} from './registerNode'
import {
    drg_add,
    node_hover,
    cross,
    paste
} from './registerBehavior'

import G6 from "@antv/g6/lib/index";
/*定义自定义节点*/
G6.registerNode("start_node", start_node);
G6.registerNode("exigency_node", exigency_node);
G6.registerNode("end_node", end_node);
G6.registerNode("warning_node", warning_node);
G6.registerNode("imaginary_line", imaginary_line);
G6.registerNode("normal_node", normal_node);

/*定义自定义交互行为*/
G6.registerBehavior("paste", paste);
G6.registerBehavior("drg_add", drg_add);
G6.registerBehavior("node_hover", node_hover);
G6.registerBehavior("cross", cross);

export default G6
