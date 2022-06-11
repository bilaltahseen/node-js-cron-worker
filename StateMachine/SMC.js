const _ = require('lodash');
const { states } = require('../constants');
const {smcResponse} = require('../utils/index');
const { fork } = require('child_process');
const { updateRow } = require('../DAL');
class SMC {

    async execute(row){
        try 
        {
            const currentState = _.get(row,'state','N/A')
            switch (currentState) {
                case states.SUBMITTED:
                    return smcResponse({state:states.PROCESSING,message:'Current states changes to processing'}) 
                case states.PROCESSING:
                    if([1,3,5,2].includes(row.id)){
                        return smcResponse({state:states.BIGPROCESS,message:'Transaction In Big Process !'})
                    }
                case states.BIGPROCESS:
                    console.log('Current in in big process',row.id)
                    const bigProcess = fork("./reallyBigProcess.js");
                    bigProcess.send({id:row.id,data:row.data})
                    bigProcess.on('message',async function(message){
                        await updateRow(message.id,states.PROCESSED,{id:message.id},'Completed',false,'Ok')
                    })
                default:
                    console.log('No state defined !')
                    break;
            }
            
        }
        catch (error) {
        console.log("🚩 ~ file: SMC.js ~ line 7 ~ SMC ~ execute ~ error", error)
        return smcResponse({state:states.FAILED,message:error.message,error:true,response:null})
        }
    }

}

module.exports = SMC