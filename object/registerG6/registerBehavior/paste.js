import {G6global} from '../../common/G6global'
import {only} from '../../utils'

const paste = {
    //粘贴模式下鼠标点击画布
    getEvents() {
        return {
            'canvas:click': 'click',
        };
    },
    click(e){

    },
};

export default paste
