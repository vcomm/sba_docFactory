import biosContent  from '../libs/biosContent';
import serviceManager from '../libs/serviceManager';
import logic from'../fsm/vueFactory.json';

export  default {
    data() {
        return {
            cntx: new biosContent(logic,this),
            smng: new serviceManager(),
        }
    },
    created() {

    }
}