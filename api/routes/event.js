const express = require('express');
const Event = require('../models/EventModel');
const Group = require('../models/GroupModel');

// this router 
// root is /:gid/events
let router = express.Router();

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