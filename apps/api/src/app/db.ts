import * as mongoose from 'mongoose';

let db;

function connect(callback) {
  mongoose
    .connect(
      'mongodb+srv://martin:Mongomongo123@floppd-bg2yz.azure.mongodb.net/floppd?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    .then(
      () => {
        console.log('connected to mongo');
        db = mongoose.connection;
        callback();
      },
      (err) => {
        console.log('error connecting to mongo');
      }
    );
}

function get() {
  return db;
}

function close() {
  db.close();
}

export default { get: get, close: close, connect: connect };
