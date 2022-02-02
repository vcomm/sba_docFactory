import { createStore } from 'vuex'
import { docModule } from './docModule'


export default createStore({
  modules:{
    doc: docModule
  }
})
