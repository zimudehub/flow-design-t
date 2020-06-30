<template>
  <div id="app">
    <div style="margin: auto; width: 100%; height: 100vh">
      <FlowDesignTCD>
        <template v-slot:edge>
          <div>
            这是边
          </div>
        </template>
        <template v-slot:node>
          <div>
            这是节点
          </div>
        </template>
      </FlowDesignTCD>>
    </div>
  </div>
</template>

<style lang="less">

</style>
