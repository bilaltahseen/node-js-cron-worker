const CronService = require('./cron.service');
const TestService = require('./test.service');
const service = {};

service.cron = CronService;
service.testService = TestService;

module.exports = service;
