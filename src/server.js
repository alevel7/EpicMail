const express = require('express');
const uid = require('rand-token').uid;
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const request = require('supertest');

import user from '../controllers/user_controller';
import messenger from '../controllers/message_controller';
const app = express();

const user_controller = new user()
const message_controller= new messenger()
// MIDDLEWARE WARES
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());
//method override middleware
app.use(methodOverride('_method'));

//Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//static files
app.use("/public", express.static(path.join(__dirname, 'public')));

app.post('/v1/auth/login', user_controller.signIn)
app.post('/v1/auth/signup',user_controller.signUp)
app.post('/v1/messages',message_controller.createMessage)
app.get('/v1/messages', message_controller.getAllMessages)
app.get('/v1/messages/sent', message_controller.getAllSent)
app.get('/v1/messages/unread', message_controller.getAllUnread)
app.get('/v1/messages/:id',message_controller.getMail)
app.delete('/v1/messages/:id',message_controller.deleteMail)


//listen for requests
app.listen(process.env.PORT || 4000, function () {
  console.log("now listening for request")
})

export default app;