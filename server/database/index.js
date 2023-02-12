const dotenv = require("dotenv");
dotenv.config();

module.exports.init = function(){const url = "mongodb://reactlmsdb:G9xJgD6gxbdqkgAjDWS4H96PWkxkEfLyOMI0KDwNa0ZTuLqZYPM5kQMpMGgwAkPwLpPJhVajPvXoACDbMoo9gg==@reactlmsdb.mongo.cosmos.azure.com:10255/lmsdatabase?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@reactlmsdb@"
const mongoose = require('mongoose');
const { response } = require('express');
mongoose.set('strictQuery', true)
mongoose.connect(url).then(()=>{
    console.log("Connected")
});
}