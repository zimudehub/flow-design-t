import FlowDesignTCD from './pages'

import G6 from './registerG6'
import '../styles/flow-design-tcd.less'
import 'element-ui/lib/theme-chalk/index.css';

import elementCom from './elementCom'

function install(Vue) {
    //检查是否已经注册过FlowDesignTCD
    if (install.installed)return;
    install.installed = true;
    Vue.prototype.G6 = G6;
    Vue.component(FlowDesignTCD.name,FlowDesignTCD);
    //将element组件内置到Flow-design-tcd中
    for (let ele in elementCom){
        Vue.use(elementCom[ele])
    }
}

if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

export default {
    install
}
