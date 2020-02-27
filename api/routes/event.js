const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/EventModel');
const Group = require('../models/GroupModel');
const User = require('../models/UserModel');

// this router 
// root is /:gid/events
let router = express.Router({mergeParams: true});

router.get('/', (req, res)=>{
    Group.findById(req.params.gid, {events: 1}, (err, events)=>{
        if (events === null){
            res.status(404).json({msg:`Group ${req.params.id} not found`});
            return;
        }

        res.status(200).json(events);
    });
});

router.post('/', (req, res)=>{
    // create the new event
    let event = new Event(req.body);

    Group.findById(req.params.gid, (err, group)=>{
        if (group == null){
            res.status(404).json({msg:`Group ${req.params.id} not found`});
            return;
        }
        // add new event to this group schema
        group.events.push(event);
        group.save((err)=>{
            if (err){
                res.status(400).json({msg: err.message});
                return;
            }
            res.status(200).json(event);
        });
        
    });
});

router.get('/:eid', (req, res)=>{
    // find the group
    Group.findById(req.params.gid, (err, group)=>{
        if (group == null){
            res.status(404).json({msg:`Group ${req.params.gid} not found`});
            return;
        }

        group.getEvent(req.params.eid, (event)=>{
            if (event === null){
                res.status(404).json({msg:`Event ${req.params.eid} is not found`});
                return;
            }
            res.status(200).json(event);
        });        
    });
});

router.put('/:eid/:id', (req, res)=>{
    Group.findById(req.params.gid, (err, group)=>{
        if (group == null){
            res.status(404).json({msg:`Group ${req.params.gid} not found`});
            return;
        }

        User.findById(req.params.id, (err, user)=>{
            if (user === null){
                res.status(404).json({msg:`User ${req.params.id} is not found`});
                return;
            }

            group.getEvent(req.params.eid, (event)=>{
                if (event === null){
                    res.status(404).json({msg:`Event ${req.params.eid} is not found`});
                    return;
                }

                event.toggleAttendance(user, (going)=>{
                    // save entire doc
                    group.save(()=>res.status(200).json({_id:event.id, going:going}));
                    
                });
            })

        });

    })
});

router.delete('/:eid', (req,res)=>{
    Group.findById(req.params.gid, (err, group)=>{
        if (group == null){
            res.status(404).json({msg:`Group ${req.params.gid} not found`});
            return;
        }


        group.removeEvent(req.params.eid, (event)=>{
            if (event === null){
                res.status(404).json({msg:`Event ${req.params.eid} is not found`});
                return;
            }

            group.save((err)=>{
                res.status(200).json({msg:`Event ${req.params.eid} was deleted`});
            });
        });  
    });
});

module.exports = router;