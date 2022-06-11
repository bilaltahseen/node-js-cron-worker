const { states } = require("./constants");



process.on("message", function (message) {
    setTimeout(async ()=>{
        process.send(message)
    },100000)
});