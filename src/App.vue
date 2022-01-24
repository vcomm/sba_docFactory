<template>
  <div id="app">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <Factory :url="url"/>
        </div>
      </el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import Factory from '@/components/Factory.vue'

export default {
  name: 'app',
  components: {
    Factory    
  },
  data(){
    return {
      url: 'https://legaldbol.com/wp-content/uploads/2019/03/79-Best-Australian-Tax-Invoice-Template-No-Gst-in-Photoshop-for-Australian-Tax-Invoice-Template-No-Gst.jpg'
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@import url("//unpkg.com/element-ui@2.15.7/lib/theme-chalk/index.css");
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
