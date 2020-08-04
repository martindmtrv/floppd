(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const Schema = mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"];
let EventSchema = Schema({
    title: { type: String, required: true },
    organizer: { type: String, required: true },
    description: String,
    location: { type: String, required: true },
    date: { type: Date, required: true },
    attending: [{ type: String, required: true }],
    flopping: [{ type: String, required: true }],
    hasAnswered: [{ type: String, required: true }],
});
EventSchema.methods.flop = function (user) {
    this.flopping.push(user);
};
EventSchema.methods.attend = function (user) {
    this.attending.push(user);
};
EventSchema.methods.hasReplied = function (id, cb) {
    cb(this.hasAnswered.includes(id));
};
/* harmony default export */ __webpack_exports__["a"] = (mongoose__WEBPACK_IMPORTED_MODULE_0__["model"]('Event', EventSchema));


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

let db;
function connect(callback) {
    mongoose__WEBPACK_IMPORTED_MODULE_0__["connect"]('mongodb+srv://martin:Mongomongo123@floppd-bg2yz.azure.mongodb.net/floppd?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
        .then(() => {
        console.log('connected to mongo');
        db = mongoose__WEBPACK_IMPORTED_MODULE_0__["connection"];
        callback();
    }, (err) => {
        console.log('error connecting to mongo');
    });
}
function get() {
    return db;
}
function close() {
    db.close();
}
/* harmony default export */ __webpack_exports__["a"] = ({ get: get, close: close, connect: connect });


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_EventModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _app_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
const express = __webpack_require__(5);
const session = __webpack_require__(6);
const MongoDBStore = __webpack_require__(7)(session);
const path = __webpack_require__(8);


const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'floppd')));
app.use(session({
    secret: 'super duper secret',
    store: new MongoDBStore({
        connectionOptions: { useUnifiedTopology: true },
        uri: 'mongodb+srv://martin:Mongomongo123@floppd-bg2yz.azure.mongodb.net/tokens?retryWrites=true&w=majority',
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
}));
const port = process.env.PORT || 3333;
_app_db__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].connect(() => {
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
    event = new _models_EventModel__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](req.body);
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
    }
    else {
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
    }
    else {
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
    }
    else {
        res.status(400).json({ msg: 'Bad name' });
    }
});
app.get('/api/event/:id', (req, res) => {
    _models_EventModel__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].findById(req.params.id, (err, event) => {
        if (err || event === null) {
            res.status(404).json({ msg: `Event ${req.params.id} is not found` });
            return;
        }
        res.status(200).json(Object.assign(Object.assign({}, event._doc), { responded: event.hasAnswered.includes(req.session.id) }));
    });
});
app.post('/api/event/:id', (req, res) => {
    if (!req.session.name) {
        res.status(404).json({ msg: 'No user associated yet' });
        return;
    }
    _models_EventModel__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].findById(req.params.id, (err, event) => {
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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("connect-mongodb-session");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })
/******/ ])));
//# sourceMappingURL=main.js.map