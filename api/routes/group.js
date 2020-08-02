const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/UserModel');
const Group = require('../models/GroupModel');

// this router handles all routes /group
let router = express.Router();

router.post('/', (req, res) => {
    // set defaults
    req.body.admins = [];
    req.body.events = [];
    req.body.users = [];    

    let group = new Group(req.body);

    if (req.session.loggedIn){
        group.admins.push(req.session._id);
    }

    group.save((err) => {
        if (err) {
            res.status(400).json({ msg: err.message });
            return;
        }
        res.status(200).json(group);
    });
});

router.get('/:gid', (req, res) => {
    Group.findById(req.params.gid, (err, group) => {
        if (group == null) {
            res.status(404).json({ msg: `Group ${req.params.gid} not found` });
            return;
        }

        // add some populator here!
        group.populate('admins users', 'username rating')
        .populate('events', (err, group) => {
            res.status(200).json(group);
        });
    });
});

router.put('/:gid/users', (req, res) => {
    Group.findById(req.params.gid, (err, group) => {
        if (group == null) {
            res.status(404).json({ msg: `Group ${req.params.gid} not found` });
            return;
        }

        User.findById(req.body.id, { _id: 1 }, (err, user) => {
            if (user == null) {
                res.status(404).json({ msg: `User ${req.body.id} not found` });
                return;
            }

            group.isInGroup(req.body.id, ({ isAdmin, pos, _id }) => {
                if (isAdmin !== undefined) {
                    res.status(409).json({ msg: `User ${req.body.id} already in group ${req.params.gid}` });
                    return;
                }
                // first user in the group is always an admin
                if (group.admins.length == 0) {
                    group.admins.push(user._id);
                } else {
                    group.users.push(user._id);
                }
                group.save((err) => {
                    res.status(200).json({msg:`Added user ${req.body.id} to group ${req.params.gid}`});
                    return;
                });
            });
        });
    });
});

// post to this route to change user permissions
// this needs to be authorized by an admin
router.put('/:gid/users/:id', (req, res) => {
    if (typeof req.body.admin !== 'boolean') {
        req.body.admin = (req.body.admin === 'true') ? true : false;
    }
    let msg;

    if (typeof req.body.admin !== 'boolean') {
        res.status(400).json({ msg: "Missing or incorrect permission fields in post" });
        return;
    }

    Group.findById(req.params.gid, (err, group) => {
        if (group == null) {
            res.status(404).json({ msg: `Group ${req.params.gid} not found` });
            return;
        }

        group.isInGroup(req.params.id, ({ isAdmin, pos, _id }) => {
            if (isAdmin === undefined) {
                res.status(404).json({ msg: `User ${req.params.id} not found in group ${req.params.gid}` });
                return;
            }

            // promote/demote as required
            // you cannot demote the last admin
            if (req.body.admin && !isAdmin) {
                group.admins.push(_id);
                group.users.splice(pos, 1);
                msg = `User ${req.params.id} promoted to admin in ${req.params.gid}`;
            } else if (group.admins.length != 1 && !req.body.admin && isAdmin) {
                group.users.push(_id);

                group.admins.splice(pos, 1);
                msg = `User ${req.params.id} demoted to user in ${req.params.gid}`;
            } else {
                res.status(400).json({ msg: `Invalid permission request for user ${req.params.id}` });
                return;
            }

            group.save((err) => {
                res.status(200).json({ msg: msg });
            });
        });
    });
});

router.delete('/:gid/users/:id', (req, res) => {
    Group.findById(req.params.gid, (err, group) => {
        if (group == null) {
            res.status(404).json({ msg: `Group ${req.params.gid} not found` });
            return;
        }

        group.isInGroup(req.params.id, ({ isAdmin, pos, _id }) => {
            if (isAdmin === undefined) {
                res.status(404).json({ msg: `User ${req.params.id} not in group ${req.params.gid}` });
            }
            // remove the user (cannot remove last admin)
            if (isAdmin && group.admins.length != 1) {
                group.admins.splice(pos, 1);
            } else if (!isAdmin) {
                group.users.splice(pos, 1);
            } else {
                res.status(400).json({ msg: `Cannot remove user ${req.params.id} because he is the last admin` });
            }
            group.save((err) => {
                res.status(200).json({ msg: `Removed user ${req.params.id} from group ${req.params.gid}` });
            });
        });
    });
});

module.exports = router;