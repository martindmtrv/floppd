const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let EventSchema = Schema({
    name: {type:String, required: true},
    description: String,
    location: {type: String, required: true},
    date: {type: Date, required: true},
    attending: [{type: mongoose.Types.ObjectId, ref: 'User'}]
});


EventSchema.methods.toggleAttendance = function(user, cb){
    let pos = this.attending.indexOf(user._id);
    if (pos < 0){
        this.attending.push(user._id);    
    } else{
        this.attending.splice(pos, 1);
    }

    cb(pos < 0);
};

EventSchema.methods.isAttending = function(user, cb){
    cb(this.attending.includes(user._id));
}

module.exports = mongoose.model("Event", EventSchema);