const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Event = require('./EventModel');

let GroupSchema = Schema({
    name: {type: String, required: true, minlength:1, maxlength: 20},
    admins: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    users: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    events: [mongoose.model('Event').schema]
});

// takes an id string and checks if the user is in the specifed group 
// returns {isAdmin, pos, _id} or {}
GroupSchema.methods.isInGroup = function(id, cb){
    let pos = -1;
    let _id;
    let isAdmin = true;

    this.users.some((u, index) => {
        if (u._id.toString() === id) {
            pos = index;
            _id = u._id;
            isAdmin = false;
            return true;
        }
    });

    if (isAdmin) {
        this.admins.some((u, index) => {
            if (u._id.toString() === id) {
                pos = index;
                _id = u._id;
                return true;
            }
        });
    }

    if (pos < 0){
        cb({});
        return;
    }
    cb({
        isAdmin: isAdmin,
        pos: pos,
        _id: _id
    });

};

GroupSchema.methods.getEvent = function(eid, cb){
    let event = null;

    this.events.some((item)=>{
        if (eid === item._id.toString()){
            event = item;
            return true;
        }
    });
    cb(event);
};

GroupSchema.methods.removeEvent = function(eid, cb){
    let event = null;

    this.events.some((item, index)=>{
        if (eid === item._id.toString()){
            event = this.events.splice(index, 1);
            return true;
        }
    });

    cb(event);
}

module.exports = mongoose.model("Group", GroupSchema);