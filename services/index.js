const CronService = require('./cron.service');
const TestService = require('./test.service');
const FSMService = require('./FSM.service');
const service = {};

service.cron = CronService;
service.testService = TestService;
service.FSMService = FSMService;

module.exports = service;
