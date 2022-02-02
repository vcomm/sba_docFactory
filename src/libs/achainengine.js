import EventEmitter from 'events'
import asynChain from './asynchain'
 
export default class aChainEngine extends EventEmitter {

    constructor() {
        super()
        this.chains = {}
    }

    emitOnce(evname,funclst,cntx) {
        this.chains[evname] = new asynChain(funclst)
        this.on(evname,()=>this.chains[evname].queuecall(cntx,()=>{
            this.removeEvent(evname)
            console.log(`: Finish Once Chain[${evname}]: `,this.eventNames());
        }),cntx)
        return this.eventNames()
    }

    emitOn(evname,funclst,cntx) {
        this.chains[evname] = new asynChain(funclst)
        this.chains[evname].seqClone()
        this.on(evname,(context)=>this.chains[evname].queuecall(context || cntx,()=>{
            console.log(`: Finish On Chain[${evname}] and restore: `,this.eventNames());
        },true),cntx)
        return this.eventNames()
    }

    emitEvent(evname,context) {
        this.emit(evname,context)
    }

    removeEvent(evname) {
        this.removeAllListeners(evname)
    }
}
