const schedule = require('node-cron');

let cronJob;
class Cron {
    constructor() {}

    //default interval is */10 * * * * *
    static async start(job) {
        console.log("GLOBAL CONFIG cronInterval",global.config.cronInterval)
        cronJob = schedule.schedule(global.config.cronInterval, job);
    }
    static async stop() {
        cronJob.cancel();
    }
}


module.exports = Cron;
