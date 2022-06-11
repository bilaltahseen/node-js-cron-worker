const _ = require('lodash')
const { states } = require('../constants')

function smcResponse (req){

    const state = _.get(req,'state',states.PROCESSING);
    const data = _.get(req,'data',{});
    const error = _.get(req,'error',false);
    const message = _.get(req,'message','');
    const response = _.get(req,'response','Ok');

    return {state,data,error,message,response};

}

module.exports = {
    smcResponse
}