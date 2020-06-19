const node_hover = {
    getEvents() {
        return {
            'node:mouseenter': 'nodeMouseenter',
            'node:mouseleave': 'nodeMouseleave'
        };
    },
    nodeMouseenter(e) {
        e.preventDefault();
        if (!this.shouldUpdate.call(this, e)) {
            return;
        }
        const { item } = e;
        const graph = this.graph;
        graph.setItemState(item, 'node_hover', true);
        // console.log(graph.get("group").findAll((item)=>{
        //     return item.attr('name') === 'point'
        // }))
    },
    nodeMouseleave(e) {
        e.preventDefault();
        if (!this.shouldUpdate.call(this, e)) {
            return;
        }
        const { item } = e;
        const graph = this.graph;
        graph.setItemState(item, 'node_hover', false);
    }
};

export default node_hover
