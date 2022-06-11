const schedule = require('node-cron');

let cronJob;
class Cron {
    constructor() {}

    //default interval is */10 * * * * *
    static async start(job,interval) {
        console.log("GLOBAL CONFIG cronInterval",interval || global.config.cronInterval)
        cronJob = schedule.schedule(interval || global.config.cronInterval, job);
    }
    static async stop() {
        cronJob.cancel();
    }
}


module.exports = Cron;
