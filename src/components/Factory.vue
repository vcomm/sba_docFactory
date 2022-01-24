<template>
  <div class="status">
    <div class="coord">
      <span style=" margin-left: 10px;">X: <strong>{{ coord.x }}</strong></span>
      <span style=" margin-left: 10px;">Y: <strong>{{ coord.y }}</strong></span>
    </div>
  </div>
  <div class="factory">   
    <div class="image">
      <img class="imagemap" ref="imagemap" :src="url" style="margin: 1px;">
    </div> 
    <canvas class="canvas" ref="drawimage"/>
      <!--
      <el-image ref="imagemap"
        style="width: 794px; height: 1123px; margin: 1px;"
        :src="url"
        :fit="none">
      </el-image>-->
  </div>
</template>

<script>


export default {
  name: 'Factory',
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data(){
    return{
        coord:{
          x: NaN,
          y: NaN
        },
        startDraw:{},
        stopDraw:{}
    }
  },
  created() {
    
  },
  mounted() {
    this.image = this.$refs.imagemap
    this.canvas = this.$refs.drawimage
    this.canvas.width = this.image.width
    this.canvas.height = this.image.height
    this.ctx = this.canvas.getContext("2d")
    this.boundings = this.canvas.getBoundingClientRect();
    //this.ctx.drawImage(this.image, 0, 0)
    this.canvas.addEventListener("mousemove", (event) => {
      this.coord = this.setMouseCoordinates(event)
      
      if(this.isDrawing){
        const width  = this.coord.x - this.startDraw.x
        const height = this.coord.y - this.startDraw.y
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log(`Start[${this.startDraw.x},${this.startDraw.y}]=>Stop[${this.coord.x},${this.coord.y}]`)
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(this.startDraw.x, this.startDraw.y, width, height);
        this.ctx.closePath();
        this.ctx.stroke();
      }
      //event.preventDefault();
    });
    this.canvas.addEventListener("mousedown", (event) => {
      this.startDraw = this.setMouseCoordinates(event)
      this.isDrawing = true;
          // Start Drawing
      console.log(`Start Drawing[${this.startDraw.x},${this.startDraw.y}]`)
      //event.preventDefault();
    });
    this.canvas.addEventListener("mouseup", (event) => {
      this.stopDraw = this.setMouseCoordinates(event)
      this.isDrawing = false;
      //event.preventDefault();
      console.log(`Stop Drawing[${this.stopDraw.x},${this.stopDraw.y}]`)
      setTimeout(()=>{
        const width  = this.stopDraw.x - this.startDraw.x
        const height = this.stopDraw.y - this.startDraw.y
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log(`Area[${this.startDraw.x},${this.startDraw.y}]=>[${this.stopDraw.x},${this.stopDraw.y}]`)
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'green';
        this.ctx.rect(this.startDraw.x, this.startDraw.y, width, height);
        this.ctx.closePath();
        this.ctx.stroke();
      },1000)
    });
    /*
    this.canvas.addEventListener("click", (event) => {
      this.coord = this.setMouseCoordinates(event)
    });    
    */
    this.canvas.addEventListener("dblclick", (event) => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);      
    });
  },
  methods: {
    setMouseCoordinates(event) {
      return { x: event.clientX - this.boundings.left, y: event.clientY - this.boundings.top }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.status {
  background-color:#f0ebeb6e;
  margin: auto;
  border-radius: 5px;
  border: 1px solid black;  
  width: 99.9%; /* Full width */
  height: 6vh; /* Full height */
}
.coord {
  padding-top: 10px;
  text-align: left;  
}
.factory {
  position: relative;
  display: flex;
  text-align: left;
  margin-top: 10px;
}
.image {
  position: absolute; 
  z-index: 1;
  background-color:#f0ebeb6e;
  border-radius: 5px;
  border: 1px solid black;
  text-align: left;
  width: 99.9%;
  /*width: 70%;  Full width */
  /*height: 90vh;  Full height */
}

.canvas {
  position: absolute;
  background: rgba(253, 252, 251, 0.73);
  border-radius: 5px;
  border: 1px solid rgb(243, 5, 5);  
  opacity: 0.7;
  z-index: 10;
}
</style>
