import FlowDesignTCD from './pages'

import G6 from './registerG6'
import '../styles/icons/iconfont.css'
import '../styles/flow-design-tcd.less'
let components = [FlowDesignTCD];
function install(Vue) {
    //检查是否已经注册过FormDesignTCD
    if (install.installed)return;
    install.installed = true;
    Vue.prototype.G6 = G6;
    Vue.component(FlowDesignTCD.name,FlowDesignTCD);
}

if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

export default {
    install
}
