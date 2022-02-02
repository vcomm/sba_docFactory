import serviceDeploy from './serviceDeploy';

export default class serviceManager extends serviceDeploy {
    constructor() {
        super();
        this._chain_ = {
            'BaseList': [
                (cntx) => cntx.setState(cntx.getNextSate()), 
                (cntx) => cntx.unlock()                
            ],
            'Initialize': [],    
            'KeepNameID': [],
            'newDocIDRecognition': [],
            'newDocNameRecognition': [],
            'KeepField[Key-Data]': [],
            'KeepDocPattern': [],
            'newFieldKeyRecognition': [],
            'newFieldValueRecognition': []        
        }
    }
    initLogic() { 
        this.emitOn('Initialize', [
            this._chain_['Initialize'],this._chain_['BaseList']
        ], this.content || {}); 
        this.emitOn('KeepNameID', [
            this._chain_['KeepNameID'],this._chain_['BaseList']
        ], this.content || {}); 
        this.emitOn('newDocIDRecognition', [
            this._chain_['newDocIDRecognition'],this._chain_['BaseList']
        ], this.content || {}); 
        this.emitOn('newDocNameRecognition', [
            this._chain_['newDocNameRecognition'],this._chain_['BaseList']
        ], this.content || {}); 
        this.emitOn('KeepField[Key-Data]', [
            this._chain_['KeepField[Key-Data]'],this._chain_['BaseList']
        ], this.content || {}); 
        this.emitOn('KeepDocPattern', [
            this._chain_['KeepDocPattern'],this._chain_['BaseList']
        ], this.content || {});           
        this.emitOn('newFieldKeyRecognition', [
            this._chain_['newFieldKeyRecognition'],this._chain_['BaseList']
        ], this.content || {}); 
        this.emitOn('newFieldValueRecognition', [
            this._chain_['newFieldValueRecognition'],this._chain_['BaseList']
        ], this.content || {});
    }
    addToChain(keyChain,fnKey) {
        if (keyChain && this._chain_[keyChain] && fnKey) {
            this._chain_[keyChain].push((cntx) => cntx.bios()[fnKey](cntx))
            console.log(`Add Function ${fnKey} to KeyChain ${keyChain}`)
            return true
        } else {
            console.log(`Wrong funcKey ${fnKey} OR KeyChain ${keyChain}`)
            return false
        }
    }
}