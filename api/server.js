const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const formidable = require('express-formidable');

// app-wide db connection
const db = require('./db');

const User = require('./models/UserModel');

// route handlers
const group = require('./routes/group');
const user = require('./routes/user');
const event = require('./routes/event');

// simple auth check module
const auth = require('./auth');

let app = express();

// Use the session middleware
// Set the store property in the options
app.use(session({ 
	secret:'super duper secret',
    store: new MongoDBStore({
        connectionOptions: { useUnifiedTopology: true },
        uri: 'mongodb://localhost:27017/tokens',
        collection: 'sessiondata'        
    }),
    resave: false,
    saveUninitialized: false
}));

app.use(formidable());

// combine form data with post data ()
app.use((req, res, next)=>{
    console.log(req.method, req.url);
    req.body = {};
    Object.assign(req.body, req.fields);
    delete req.fields;
    next();
});

app.use('/', express.static('public'));


// api routes
app.use('/api/users', user);
app.use('/api/groups', group);

// will handle routes /api/group/:gid/events
app.use('/api/groups/:gid/events', event);

app.get('/login', auth.logout, (req, res)=>{
    res.sendFile('public/login.html', {root: __dirname});
});

app.post('/login', auth.logout, (req, res)=>{
    User.findOne({username: req.body.username}, (err, user)=>{
        if (user == null){
            res.status(404).json({msg:`User ${req.body.username} doesn't exist`});
            return;
        }

        if (user.pw === req.body.pw){
            req.session.loggedIn = true;
            req.session.id = user.id;
            res.status(200).json({msg:'Logged in successfully!'});
        } else{
            res.status(401).json({msg:'Password incorrect!'});
        }
    });
});

app.get('/logout', auth.login, (req, res)=>{
    if (req.session.loggedIn === true){
        req.session.id = undefined;
        req.session.loggedIn = false;
        res.status(200).send('Logged out successfully');
    } else{
        res.status(404).send('No need to logout you are not logged in');
    }
});

app.get('/register', auth.logout, (req, res)=>{
    res.sendFile('public/register.html', {root: __dirname})   
});

app.get('/app', auth.login, (req, res)=>{
    res.sendFile('public/build/index.html', {root: __dirname});
});

// start the server
db.connect(()=>{
    app.listen(3000);
	console.log("Server listening on port 3000");
});
