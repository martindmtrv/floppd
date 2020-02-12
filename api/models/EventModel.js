const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let EventSchema = Schema({
    name: {type:String, required: true},
    description: String,
    location: {type: String, required: true},
    date: {type: Date, required: true},
    attending: [{type: mongoose.Types.ObjectId, ref: 'User'}]
});


EventSchema.method.toggleAttendance = function(user, cb){
    let pos = this.attending.indexOf(user._id);
    if (pos < 0){
        this.attending.push(user._id);    
        cb(true);
    } else{
        this.attending.splice(pos, 1);
        cb(false);
    }
};

EventSchema.method.isAttending = function(user, cb){
    cb(this.attending.includes(user._id));
}

module.exports = mongoose.model("Event", EventSchema);