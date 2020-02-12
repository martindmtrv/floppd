const mongoose = require("mongoose");
const db = require('../db');
const Group = require('./GroupModel');
const Schema = mongoose.Schema;

let UserSchema = Schema({
    rating: Number,
    username: {type: String, required: true, minlength: 4, maxlength: 20,
        validate:{
            validator: v => db.get().collection('users').findOne({username: v}).then(doc => doc == null),
            message: props => `'${props.value}' is already taken!`
        },
    },

    pw: {type: String, required: true, maxlength: 20, minlength: 6}
});

UserSchema.methods.getGroups = function(cb){
    Group.find({$or: [{"admins": this._id}, {"users": this._id}]}, (err, groups)=>{
        if (groups === null){
            cb([]);
            return;
        }

        cb(groups);
    });
};

UserSchema.methods.getEvents = function(cb){
    Group.find({$or: [{"admins": this._id}, {"users": this._id}]}, (err, groups)=>{
        if (groups === null){
            cb([]);
            return;
        }
        let events = [];

        groups.forEach(group => events.push(...group.events));
        cb(events);
    });
};

module.exports = mongoose.model("User", UserSchema);