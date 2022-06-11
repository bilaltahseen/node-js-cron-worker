// Finite State Machine Pattern Using Database 

global.config = {
    cronInterval:'*/10 * * * * *',
    assignee:"BILAL",
    dbConfig:{
        host: 'localhost',
        port: 5432,
        database: 'solidityevents',
        user: 'sg',
        password: 'dbuser123',
    }
}


 function init (){
    try{
        require('./scheduler');
    }
    catch(error){
    console.log("🚩 ~ file: index.js ~ line 21 ~ init ~ error", error)
        throw error
    }
}

init()