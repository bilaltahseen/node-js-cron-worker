

async function execute(){
    try {
    console.log('Working In Test Serivce');
    } catch (error) {
    console.log("🚩 ~ file: test.service.js ~ line 7 ~ execute ~ error", error)
    throw error
    }
}

module.exports = {
    execute
}