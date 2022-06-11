const { fork } = require('child_process');
const config = global.config;
const _ = require("lodash");


const startSchedulers = () => {

    function FSMServiceExecution() {
        console.log('FSM Service started!');
        let FSMServiceExFork = fork('./controllers/FSM.controller.js');
        FSMServiceExFork.send(config);
        FSMServiceExFork.on('close', () => {
            console.log('Alert process closed !!!');
            setTimeout(FSMServiceExecution, 6000);
        });
    }
    FSMServiceExecution();

    function FSMServiceRetryExecution() {
        console.log('Retry Service started!');
        let FSMServiceRetryExFork = fork('./controllers/FSMRetry.controller.js');
        FSMServiceRetryExFork.send(config);
        FSMServiceRetryExFork.on('close', () => {
            console.log('Alert process closed !!!');
            setTimeout(FSMServiceRetryExecution, 6000);
        });
    }
    FSMServiceRetryExecution();
    
};

startSchedulers();
