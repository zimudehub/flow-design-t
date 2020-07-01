<template>
  <div id="app">
    <div style="margin: auto; width: 100%; height: 100vh">
      <FlowDesignTCD
        :nodeModel.sync="nodeModel"
        :edgeModel.sycn="edgeModel"
      >
        <template v-slot:node>
          <div class="form-wrap">
            <el-form :model="nodeModel" label-position="left" size="mini" label-width="20%">
              <el-form-item label="节点标签">
                <el-input v-model="nodeModel.label"></el-input>
              </el-form-item>
              <el-form-item label="操作节点">
                <el-input v-model="nodeModel.handleNode"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </template>
        <template v-slot:edge>
          <div class="form-wrap">
            <el-form label-position="left" size="mini" label-width="20%">
              <el-form-item label="连线标签">
                <el-input v-model="edgeModel.label"></el-input>
              </el-form-item>
              <el-form-item label="属性">
                <el-input v-model="edgeModel.props"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </FlowDesignTCD>>
    </div>
  </div>
</template>
<script>
  export default {
    // watch:{
    //   edgeModel:{
    //     handler(newValue, oldValue){
    //       console.log(newValue)
    //     },
    //     deep: true
    //   }
    // },
    data(){
      return{
        nodeModel: {
          label: "11111",
          handleNode: "",
        },
        edgeModel: {
          label: "next",
          props: ""
        },
      }
    }
  }
</script>

<style>
  .el-form-item{
    white-space: nowrap;
  }
  .form-wrap{
    width: 100%;
    height: 65%;
    box-sizing:border-box;
    padding: 15px;
  }
</style>
