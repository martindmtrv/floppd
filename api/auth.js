const Group = require('./models/GroupModel');

// simple auth function just checks the boolean of the session
let login = (req,res, next)=>{
	if (req.session.loggedIn){
		next();
	} else{
		res.status(401).json({msg: 'Not logged in!'});
	}
};

let logout = (req, res, next)=>{
	if (req.session.loggedIn === undefined || !req.session.loggedIn){
		next();
	} else{
		res.status(208).json({msg:'Already logged in!'});
	}
};

let user = (req, res, next)=>{
	if (res.session.id === req.params.id){
		next();
	} else{
		res.status(401).json({msg:`Not authorized as user ${req.params.id}`});
	}
}

// check if gid matches a group the user is in
let group = (req, res, next)=>{
	Group.findById(req.params.gid, (err, group)=>{
		if (group == null){
			res.status(404).json({msg: `Group ${req.params.gid} not found`});
            return;
		}

		group.isInGroup(req.session.id, (result)=>{
			if (result._id !== undefined){
				next();
			} else{
				res.status(401).json({msg:`User ${req.session.id} is not authorized to access this resource`});
			}
		});
	});
};

// check if session is an admin
let admin = (req, res, next)=>{
	Group.findById(req.params.id, (err, group)=>{
		if (group == null){
			res.status(404).json({msg: `Group ${req.params.gid} not found`});
            return;
		}

		group.isInGroup(req.session.id, (result)=>{
			if (result.isAdmin === undefined || !result.isAdmin){
				res.status(403).json({msg: `User ${req.session.id} is not permitted to access this resource`});
				return;
			}
			next();
		});
	});

};



module.exports = {
	login,
	logout,
	user,
	group,
	admin
};