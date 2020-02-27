const express = require('express');
const User = require('../models/UserModel');
const Group = require('../models/GroupModel');

// this router handles all routes /user
let router = express.Router();

router.post('/', (req, res)=>{    
    // overwrite for defaults
    req.body.groups = [];
    req.body.rating = 0;

    let user = new User(req.body);

    // save to the db; validation handled in schema
    user.save((err, user)=>{
        if (err){
            res.status(400).json({msg: err.message});
            return;
        }
        res.status(200).json({msg: `Created user ${user.id}`});
    });
});

router.get('/:id', (req, res)=>{
    // try and pull the given user
    User.findById(req.params.id, {pw: 0}, (err,doc)=>{
        if (doc == null){
            res.status(404).json({msg: `User ${req.params.id} not found`});
            return;
        }

        res.status(200).json(doc);
    });
});

router.get('/:id/groups', (req, res)=>{
    User.findById(req.params.id, (err, user)=>{
        if (user === null){
            res.status(404).json({msg: `User ${req.params.id} not found`});
            return;
        }
        user.getGroups((groups)=>{
            res.status(200).json({groups: groups});
        });
    });
    
});

router.get('/:id/events', (req, res)=>{
    User.findById(req.params.id, (err, user)=>{
        if (user === null){
            res.status(404).json({msg: `User ${req.params.id} not found`});
            return;
        }

        user.getEvents((events)=>{
            res.status(200).json(events);
        });
        
    });
});



module.exports = router;