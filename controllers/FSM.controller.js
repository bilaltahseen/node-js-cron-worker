const { cron, FSMService } = require('../services');
const _ = require('lodash')
const FSM = new FSMService();
const initiate = () => {
    try {
        let processingStatus = false;
        cron.start(async () => {
            console.log("Started", config.assignee)
            console.log('cron execution in progress: ', processingStatus);
            if (!processingStatus) {
                processingStatus = true;
                try {
                    await FSM.execute()
                    processingStatus = false;
                } catch (error) {
                    console.log('execution catch !!!', error);
                    processingStatus = false;
                }
            }
        });

    } catch (error) {
        console.log(error.message);
    }
};

process.on('message', async config => {
    try {
        global.config = config;
        await require('../db/pool').connect(global.config.dbConfig)
        console.log('pg lisitning at 5432!')
        initiate();
    } catch (err) {
        console.log("🚩 ~ file: fsm.controller.js ~ line 34 ~ err", err)
        process.send({ error: err.stack || err });
    }
});


