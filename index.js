const express = require('express');
const uid = require('rand-token').uid;
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const request = require('supertest');
const users_dbms = require('./db/models/User')
const message_dbms = require('./db/models/message')

const app = express();

const users_database = new users_dbms.db();
const user = users_dbms.currentUser;
const messages_database = new message_dbms.db();
const message = message_dbms.Message;
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


app.get('/', (req, res) => {
  const signin = 'signin';
  console.log(users_database);
  res.render('index', {
    signin: signin
  })
})

//version one to power sign up page
app.get('/v1/index', (req, res) => {
  const signin = 'signin';
  res.render('index', {
    signin: signin
  })
})
//route to get the sign up page
app.get('/v1/auth/signup', (req, res) => {
  const signup = 'signup';
  res.render('signUp', {
    signup: signup
  })
})
//route to get the compose message form
app.get('/v1/compose', (req, res) => {
  res.render('compose')
})

app.get('/v1/messages', (req, res) => {
  res.render('inbox');
})

app.get('/v1/messages/unread', (req, res) => {
  res.render('unread')
});

app.get('/v1/messages/sent', (req, res) => {
  res.render('sent')
})
app.get('/v1/messages/:id', (req, res) => {
  res.render('viewmail')
})




//post routes to version two for rest api
app.post('/v2/auth/signup', (req, res) => {
  const newUser = new user().create({
    'email': req.body.email,
    'firstName': req.body.firstName,
    'lastName': req.body.lastName,
    'password': req.body.password
  });
  newUser.id = users_database.id;
  users_database.save(newUser);
  console.log(users_database.users)
  res.json({
    "status": 201,
    "data": [newUser]
  })
})
//api to handle log in 
app.post('/v2/auth/login', (req, res) => {
  let current_user = users_database.findOne(req.body.email);
  console.log(current_user);
  if (current_user && current_user.password === req.body.password) {
    users_database.logIn(req.body.email);
    res.json({
      "status": 200,
      "data": [current_user]
    })
  } else {
    res.json({
      "status": 404,
      "data": []
    })
  }
})

//api to process sent messages
app.post('/v2/messages', (req, res) => {
  if (!req.body.from) {
    res.json({
      "status": 406,
      "data": []
    })
  } else {
    const newMessage = new message().create({
      "subject": req.body.subject,
      "message": req.body.message,
      "parentMessageId": 0,
      "status": req.body.status,
      "senderId": req.body.from,
      "recieverId": req.body.to
    })

    newMessage.id = messages_database.id;
    messages_database.save(newMessage);
    res.json({
      "status": 201,
      "data": [newMessage]
    })
  }
})

//api to fetch all recieved mails
app.get('/v2/messages', (req, res) => {
  let allMessages = messages_database.allReceived(2);
  res.json({
    "status": 200,
    "data": [
      allMessages
    ]
  })
})


//api to fetch all unread mails
app.get('/v2/messages/unread', (req, res) => {
  let allMessages = messages_database.allUnread('unread');
  res.json({
    "status": 200,
    "data": [
      allMessages
    ]
  })
})
//api to fetch all sent mails
app.get('/v2/messages/sent', (req, res) => {
  let allMessages = messages_database.allSent('sent');
  res.json({
    "status": 200,
    "data": [
      allMessages
    ]
  })
})

//api to fetch individual  mails
app.get('/v2/messages/:id', (req, res) => {
  let message = messages_database.messages.find((current) => {
    return current.id = req.params.id;
  })
  res.json({
    "status": 200,
    "data": [
      message
    ]
  })
})


//api to fetch individual  mails
app.get('/v2/messages/:id', (req, res) => {
  let message = messages_database.messages.find((current) => {
    return current.id = req.params.id;
  })
  res.json({
    "status": 200,
    "data": [
      message
    ]
  })
})

app.delete('/v2/messages/:id', (req, res) => {
  let messageId = messages_database.messages.findIndex((current) => {
    return current.id == req.params.id;
  })
  let message =  messages_database.messages[messageId];
  messages_database.messages[messageId] = '';
  res.json({
    "status": 200,
    "data": [{
      "message": message.message
    }]
  });
})


//listen for requests
app.listen(process.env.PORT || 4000, function () {
  console.log("now listening for request")
})