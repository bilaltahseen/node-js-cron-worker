const { fork } = require('child_process');
const config = global.config;
const _ = require("lodash");


const startSchedulers = () => {

    function TestServiceExecution() {
        console.log('Service started!');
        let traderServiceExFork = fork('./controllers/test.controller.js');
        traderServiceExFork.send(config);
        traderServiceExFork.on('close', () => {
            console.log('Alert process closed !!!');
            setTimeout(TestServiceExecution, 6000);
        });
    }
    TestServiceExecution();
};

startSchedulers();
