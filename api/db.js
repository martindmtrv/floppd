const mongoose = require('mongoose');

let db;

function connect(callback){
    mongoose.connect('mongodb+srv://martin:Mongomongo123@floppd-bg2yz.azure.mongodb.net/floppd?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        .then(()=>{
            db = mongoose.connection;
            callback();
        },
        err =>{
            console.log('error connecting to mongo');
        }
    );
}

function get(){
    return db;
}

function close(){
    db.close();
}

module.exports = {
    connect,
    get,
    close
}