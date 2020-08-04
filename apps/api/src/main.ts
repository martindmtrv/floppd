const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');

import Event from './models/EventModel';

import db from './app/db';

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'floppd')));

app.use(
  session({
    secret: 'super duper secret',
    store: new MongoDBStore({
      connectionOptions: { useUnifiedTopology: true },
      uri:
        'mongodb+srv://martin:Mongomongo123@floppd-bg2yz.azure.mongodb.net/tokens?retryWrites=true&w=majority',
      collection: 'sessiondata',
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: 99999999999,
    },
  })
);

const port = process.env.PORT || 3333;
db.connect(() => {
  const server = app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/api');
  });

  server.on('error', console.error);
});

app.post('/api/event', (req, res) => {
  let event = req.body;
  if (!req.session.name) {
    res.status(401).json({ msg: 'Who are you' });
    return;
  }
  event.hasAnswered = [req.session.id];
  event = new Event(req.body);

  event.save((err) => {
    if (err) {
      res.status(400).json({ msg: err.message });
      return;
    }
    res.status(200).json(event);
  });
});

app.get('/api/who', (req, res) => {
  if (req.session.name) {
    res.status(200).json({
      name: req.session.name,
      darkMode: req.session.darkMode,
    });
  } else {
    res.status(404).json({ msg: 'No user associated yet' });
  }
});

app.post('/api/who/dark', (req, res) => {
  if (req.session.name) {
    req.session.darkMode = req.body.darkMode;
    res.status(200).json({
      name: req.session.name,
      darkMode: req.session.darkMode,
    });
  } else {
    res.status(404).json({ msg: 'No user associated yet' });
  }
});

app.post('/api/who', (req, res) => {
  if (req.body.name && req.body.name != '') {
    req.session.name = req.body.name;
    req.session.darkMode = req.body.darkMode || false;
    res
      .status(200)
      .json({ name: req.session.name, darkMode: req.session.darkMode });
  } else {
    res.status(400).json({ msg: 'Bad name' });
  }
});

app.get('/api/event/:id', (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err || event === null) {
      res.status(404).json({ msg: `Event ${req.params.id} is not found` });
      return;
    }
    res.status(200).json({
      ...event._doc,
      responded: event.hasAnswered.includes(req.session.id),
    });
  });
});

app.post('/api/event/:id', (req, res) => {
  if (!req.session.name) {
    res.status(404).json({ msg: 'No user associated yet' });
    return;
  }

  Event.findById(req.params.id, (err, event) => {
    if (err || event === null) {
      res.status(404).json({ msg: `Event ${req.params.id} is not found` });
      return;
    }
    event.hasAnswered.push(req.session.id);
    req.body.going
      ? event.attending.push(req.session.name)
      : event.flopping.push(req.session.name);

    event.save(() => {
      res.status(200).json(event);
    });
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'floppd', 'index.html'));
});
