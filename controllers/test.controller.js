const { cron, testService } = require('../services');


const initiate = () => {
    try {
        let processingStatus = false;
        cron.start(async () => {
            console.log("Started", config.assignee)
            console.log('processingFinancedInvoices cron execution in progress: ', processingStatus);
            if (!processingStatus) {
                processingStatus = true;
                try {
                    await testService.execute()
                    processingStatus = false;
                } catch (error) {
                    console.log('processingFinancedInvoices execution catch !!!', error);
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
        console.log("🚩 ~ file: test.controller.js ~ line 34 ~ err", err)
        process.send({ error: err.stack || err });
    }
});
