import aChainEngine from './achainengine';

export default class serviceDeploy extends aChainEngine {
    constructor() {
        super();      
    }
    deployLogic(logic) {

    }
    deliveryLogic(logic) {

    }
    /** Implementation required */
    initLogic() {
        throw new Error('You have to implement the method doSomething!');
    }
}