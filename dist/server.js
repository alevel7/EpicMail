"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user_controller = _interopRequireDefault(require("../controllers/user_controller"));

var _message_controller = _interopRequireDefault(require("../controllers/message_controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

var uid = require('rand-token').uid;

var path = require('path');

var exphbs = require('express-handlebars');

var methodOverride = require('method-override');

var bodyParser = require('body-parser');

var flash = require('connect-flash');

var session = require('express-session');

var request = require('supertest');

var app = express();
var user_controller = new _user_controller.default();
var message_controller = new _message_controller.default(); // MIDDLEWARE WARES

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars'); // parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
  extended: false
})); // parse application/json

app.use(bodyParser.json()); //method override middleware

app.use(methodOverride('_method')); //Express session midleware

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(flash()); // Global variables

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
}); //static files

app.use("/public", express.static(path.join(__dirname, 'public')));
app.post('/v1/auth/login', user_controller.signIn);
app.post('/v1/auth/signup', user_controller.signUp);
app.post('/v1/messages', message_controller.createMessage);
app.get('/v1/messages', message_controller.getAllMessages);
app.get('/v1/messages/sent', message_controller.getAllSent);
app.get('/v1/messages/unread', message_controller.getAllUnread);
app.get('/v1/messages/:id', message_controller.getMail);
app.delete('/v1/messages/:id', message_controller.deleteMail); //listen for requests

app.listen(process.env.PORT || 4000, function () {
  console.log("now listening for request");
});
var _default = app;
exports.default = _default;