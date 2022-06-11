const { cron } = require('../services');
const _ = require('lodash');
const { retryRow } = require('../DAL');


const initiate = () => {
    try {
        let processingStatus = false;
        cron.start(async () => {
            console.log("Retry Started", config.assignee)
            console.log('cron execution in progress: ', processingStatus);
            if (!processingStatus) {
                processingStatus = true;
                try {
                    console.log('PID Flused out!')
                    await retryRow()
                    processingStatus = false;
                } catch (error) {
                    console.log('execution catch !!!', error);
                    processingStatus = false;
                }
            }
        },'*/60 * * * * *');

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
        console.log("🚩 ~ file: fsmretry.controller.js ~ line 34 ~ err", err)
        process.send({ error: err.stack || err });
    }
});


