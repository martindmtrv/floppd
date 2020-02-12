const mongoose = require('mongoose');

let db;

function connect(callback){
    mongoose.connect('mongodb://localhost/floppd', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
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