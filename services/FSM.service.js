const _ = require('lodash');
const {getRows,releaseRow,updateRow} = require('../DAL/index');
const SMC = require('../StateMachine/SMC');

 
class FSM {

    async execute(){
        try{
            const transactions = await getRows(process.pid);
            console.log('Processing started for PID',process.pid);
            if(transactions.length > 0){
                // Pass to SMC
                for(let transaction of transactions){
                    const res = await new SMC().execute(transaction);
                    if(res){
                        const {state,data,error,message,response} = res
                        await updateRow(transaction.id,state,data,message,error,response)
                    }
                }
                
            }
            else{
                console.log('Tranasction not found !')
                await releaseRow(process.pid);
            }
        }

        catch(error){
        await releaseRow(process.pid);
        console.log("🚩 ~ file: FSM.service.js ~ line 9 ~ FSM ~ execute ~ error", error)
        }
    }



}

module.exports = FSM