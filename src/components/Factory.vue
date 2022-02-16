<template>
  <div class="factory">   
    <table>
      <thead>
        <tr>
          <div class="status">
            <!--
            <div class="coord">
              <span style=" margin-left: 10px;">X: <strong>{{ coord.x }}</strong></span>
              <span style=" margin-left: 10px;">Y: <strong>{{ coord.y }}</strong></span>
            </div>-->
            <nav ref="navi">
                
              <button class="button" ref="newdoc"
                  @click="clickButton('clkNewDoc')"><b>new Doc</b></button>
              <button class="button" ref="newdocname" style="visibility:hidden"
                  @click="clickButton('clkNewDocName')"><b>DocName</b></button>
              <button class="button" ref="newdocid" style="visibility:hidden"
                  @click="clickButton('clkNewDocID')"><b>DocID</b></button>
              <button class="button" ref="savedoc" style="visibility:hidden"
                  @click="clickButton('clkSaveDoc')"><b>save Doc</b></button>   

              <button class="button" ref="newfield" style="visibility:hidden"
                  @click="clickButton('clkNewField')"><b>new Field</b></button>
              <button class="button" ref="newfieldkey" style="visibility:hidden"
                  @click="clickButton('clkNewFieldKey')"><b>Field Key</b></button>
              <button class="button" ref="newfieldvalue" style="visibility:hidden"
                  @click="clickButton('clkNewFieldValue')"><b>Field Value</b></button>
             
            </nav>
          </div>
        </tr>
      </thead>
      <tbody>
        <tr>
          <div class="image">
            <!--<img class="imagemap" ref="imagemap" src="../assets/Tax-Invoice.jpeg" style="margin: 1px;">-->
            <img class="imagemap" ref="imagemap" :src="getUrlParam('urlimg')" style="margin: 1px;">
          </div> 
          <canvas class="canvas" ref="drawimage"/>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import { createWorker, PSM, OEM  } from 'tesseract.js';
import Logic from '../mixins/logic'

export default {
  mixins: [Logic],
  name: 'Factory',
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
        count: 0,
        lang: 'eng',
        coord:{
          x: NaN,
          y: NaN
        },
        startDraw:{},
        stopDraw:{}
    }
  },
  created() {
    this.logicInitial()
  },
  computed: {
    ...mapGetters({
      jsonPattern: 'doc/jsonPattern'
    })
  },
  mounted() {
    this.container = this.$refs.factoryContainer
    this.image = this.$refs.imagemap
    this.canvas = this.$refs.drawimage
    this.image.addEventListener("load", ()=>{
       this.canvas.width = this.image.width;
       this.canvas.height = this.image.height; 
       document.getElementById("factoryContainer").width = this.image.width;     
    }, false);
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
      //console.log(`Start Drawing[${this.startDraw.x},${this.startDraw.y}]`)
      //event.preventDefault();
    });
    this.canvas.addEventListener("mouseup", async (event) => {
      this.stopDraw = this.setMouseCoordinates(event)
      this.isDrawing = false;
      //event.preventDefault();
      //console.log(`Stop Drawing[${this.stopDraw.x},${this.stopDraw.y}]`)     
    });
    
    this.canvas.addEventListener("click", (event) => {
      //this.coord = this.setMouseCoordinates(event)
      //console.log(`Click: add field`)
    });    

    this.canvas.addEventListener("dblclick", (event) => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);   
      console.log(`DblClick: clear canvas`)   
    });
  },
  methods: {
    ...mapMutations({
      setID: 'doc/setID', 
      setName: 'doc/setName',
      setFieldRecordKey: 'doc/setFieldRecordKey',
      setFieldRecordValue: 'doc/setFieldRecordValue'
    }),
    ...mapActions({
      initNewDoc: 'doc/initNewDoc',
      newFieldDB: 'doc/newFieldDB',
      newFieldKey: 'doc/newFieldKey',
      newFieldValue: 'doc/newFieldValue'
    }),

    getUrlParam(paramName){
      const parameters = new URLSearchParams(window.location.search);
      return parameters.get(paramName);
    },

    logicInitial() {
        let fnKey = 'newDocUI'
        this.cntx.addAtom(fnKey, (cntx) => {
            cntx.component.$refs.newdoc.style.visibility = 'hidden'    
            cntx.component.$refs.newdocname.style.visibility = 'visible'    
            cntx.component.$refs.newdocid.style.visibility = 'visible'   
            cntx.component.count++
            this.initNewDoc()
        })
        this.smng.addToChain('Initialize',fnKey)

        fnKey = 'newDocName'
        this.cntx.addAtom(fnKey, async (cntx) => {
            cntx.component.$refs.newdocid.style.visibility = 'hidden'
            const result = await cntx.component.imgRecognition()    
            this.setName({name: result.text, extract: result.extract})
            cntx.component.$refs.newdocid.style.visibility = 'visible'
            cntx.component.count++ 
            if (cntx.component.count >= 3) {
                cntx.component.$refs.newfield.style.visibility = 'visible' 
            }
        })
        this.smng.addToChain('newDocNameRecognition',fnKey)

        fnKey = 'newDocID'
        this.cntx.addAtom(fnKey, async (cntx) => {
            cntx.component.$refs.newdocname.style.visibility = 'hidden'  
            const result = await cntx.component.imgRecognition()  
            this.setID({id: result.text, extract: result.extract})
            cntx.component.$refs.newdocname.style.visibility = 'visible'  
            cntx.component.count++   
            if (cntx.component.count >= 3) {
                cntx.component.$refs.newfield.style.visibility = 'visible' 
            }
        })
        this.smng.addToChain('newDocIDRecognition',fnKey)

        fnKey = 'newFieldDB'
        this.cntx.addAtom(fnKey, (cntx) => {
            this.newFieldDB()
            //cntx.component.$refs.newdoc.style.display = 'none'  
            //cntx.component.$refs.newdocname.style.display = 'none'    
            //cntx.component.$refs.newdocid.style.display = 'none'  
            cntx.component.$refs.newdocname.style.visibility = 'hidden'    
            cntx.component.$refs.newdocid.style.visibility = 'hidden' 
            cntx.component.$refs.newfield.style.visibility = 'hidden' 
            cntx.component.$refs.newfieldkey.style.visibility = 'visible'
            cntx.component.$refs.newfieldvalue.style.visibility = 'visible'
            cntx.component.count = 0        
        })
        this.smng.addToChain('KeepNameID',fnKey)
        this.smng.addToChain('KeepField[Key-Data]',fnKey)


        fnKey = 'newFieldKey'
        this.cntx.addAtom(fnKey, async (cntx) => {
            cntx.component.$refs.newfieldvalue.style.visibility = 'hidden'
            const result = await cntx.component.imgRecognition()
            this.newFieldKey({key: result.text, extract: result.extract})
            cntx.component.$refs.newfieldvalue.style.visibility = 'visible'
            cntx.component.count++   
            if (cntx.component.count >= 2) {
                cntx.component.$refs.newfield.style.visibility = 'visible' 
                cntx.component.$refs.savedoc.style.visibility = 'visible' 
                cntx.component.$refs.newfieldkey.style.visibility = 'hidden'
                cntx.component.$refs.newfieldvalue.style.visibility = 'hidden'
                cntx.component.count = 0   
            }
        })
        this.smng.addToChain('newFieldKeyRecognition',fnKey)

        fnKey = 'newFieldValue'
        this.cntx.addAtom(fnKey, async (cntx) => {
            cntx.component.$refs.newfieldkey.style.visibility = 'hidden'
            const result =  await cntx.component.imgRecognition() 
            this.newFieldValue({value: result.text, extract: result.extract})
            cntx.component.$refs.newfieldkey.style.visibility = 'visible'
            cntx.component.count++   
            if (cntx.component.count >= 2) {
                cntx.component.$refs.newfield.style.visibility = 'visible' 
                cntx.component.$refs.savedoc.style.visibility = 'visible'
                cntx.component.$refs.newfieldkey.style.visibility = 'hidden'
                cntx.component.$refs.newfieldvalue.style.visibility = 'hidden'
                cntx.component.count = 0  
            }
        })
        this.smng.addToChain('newFieldValueRecognition',fnKey)

        fnKey = 'saveDocPattern'
        this.cntx.addAtom(fnKey, async (cntx) => {
            cntx.component.$refs.newfield.style.visibility = 'hidden'
            cntx.component.$refs.savedoc.style.visibility = 'hidden'
            //cntx.component.$refs.newdoc.style.display = 'block'  
            cntx.component.$refs.newdoc.style.visibility = 'visible' 
            //cntx.component.$refs.newdocname.style.display = 'block'    
            //cntx.component.$refs.newdocid.style.display = 'block'  
            console.log(`Save Doc Pattern`, cntx.component.jsonPattern)
        })
        this.smng.addToChain('KeepDocPattern',fnKey)

        this.smng.initLogic();
    },
    setMouseCoordinates(event) {
      return { x: event.clientX - this.boundings.left, y: event.clientY - this.boundings.top }
    },
    async ocrImage(image, extract) {
      try {
          const worker = createWorker({logger: m => console.log(m)});
          await worker.load();
          await worker.loadLanguage(this.lang);
          await worker.initialize(this.lang, OEM.LSTM_ONLY);
          await worker.setParameters({ tessedit_pageseg_mode: PSM.SINGLE_BLOCK, });
          const { data: { text } } = await worker.recognize(image, { rectangle: extract });
          await worker.terminate();
          console.log(`Recognize: `,text);
          return text;
      } catch (err) {
          console.error(`Error Recognition:`, err)
      }
    },
    async clickButton(trig) {
      const state = await this.cntx.eventLoop(trig, this.smng);
      console.log(` EvProc[${trig}] => nextState[${state}]:`);
    },
    async imgRecognition() {
      const width  = this.stopDraw.x - this.startDraw.x
      const height = this.stopDraw.y - this.startDraw.y
      const extract = { left: this.startDraw.x, top: this.startDraw.y, width: width, height: height };
      const text = await this.ocrImage(this.image, { left: this.startDraw.x, top: this.startDraw.y, width: width, height: height }); 
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'green';
      this.ctx.rect(this.startDraw.x, this.startDraw.y, width, height);
      this.ctx.closePath();
      this.ctx.stroke();  
      return {text, extract};
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
nav {
  text-align: left; 
  margin-left: 10px;
  margin-top: 3px; 
//  align-items: center;
}
.button {
  margin-left: 5px;
  padding: 10px 15px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  outline: none;
  color: #fff;
  background-color: #04AA6D;
  border: none;
  border-radius: 5px;
  box-shadow: 0 5px #999;
}
.button:hover {background-color: #3e8e41}
.button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.status {
//  background-color:#f0ebeb6e;
//  margin: auto;
  border-radius: 5px;
  border: 2px solid teal;
  width: 100%; /* Full width */
  height: 5.5vh; /* Full height */
}
.coord {
  padding-top: 10px;
  text-align: left;  
  width: 150px;
}
.factory {  
  position: relative;
  display: flex;
/* 
  text-align: left;
  margin-top: 10px;
*/
  text-align: left;
//  background-color:#f0ebeb6e;
//  border-radius: 5px;
//  border: 2px solid teal;
  height: 90vh; 
}
.image {
  position: absolute; 
  z-index: 1;
  background-color:#f0ebeb6e;
  border-radius: 5px;
  border: 2px solid teal;
  text-align: left;
//  width: 99.9%;
  /*width: 70%;  Full width */
  /*height: 90vh;  Full height */
}

.canvas {
  position: absolute;
  margin-top: 2px;
  margin-left: 2px;
  background: rgba(253, 252, 251, 0.73);
//  border-radius: 5px;
//  border: 1px solid rgb(243, 5, 5);  
  opacity: 0.7;
  z-index: 10;
  cursor:crosshair;
}
</style>
