import serviceContent  from './serviceContent';

export default class biosContent extends serviceContent {
    constructor(logic, component) {
        super(logic);
        this._abios_ = {}
        this.component = component;
    }
    bios() {
        return this._abios_
    }
    addAtom(fnKey, fnCode) {
        this._abios_[fnKey] = fnCode
        console.log(`Add Function ${fnKey} to Bios`)
    }
    fsmReset(initState) {
        this.state = initState || this.logic.states.init.key;
        console.log(`Reset FSM:`,this.state)
    }
}