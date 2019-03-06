const express = require('express');
const uid = require('rand-token').uid;
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const request = require('supertest');
const user = require('./db/models/User')
const message = require('./db/models/message')

const app = express();
const users_db = new user.User();
const messages_db = new message.Message()
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
app.get('/v1/compose',(req, res)=>{
  res.render('compose')
})

//route to handle sign in form
app.post('/v1/auth/login', (req, res)=>{
  let current_user = users_db.findOne(req.body.email);
  if(current_user && current_user.password === req.body.password){
    users_db.logIn(req.body.email);
    res.redirect('/v1/messages')
  }else{
    req.flash('error_msg', 'You are not registered, please register ')
    res.redirect('/v1/index')
  }
})
//route to handle creating and sending a mail form
app.post('/v1/messages',(req, res)=>{
  
})

//route to create a new user
app.post('/v1/auth/signup', (req, res) => {
  const newUser = users_db.create({
    'email': req.body.email,
    'firstName': req.body.firstName,
    'lastName': req.body.lastName,
    'password': req.body.password
  });
  req.flash('success_msg', 'Registeration Successful,please login ')
  res.redirect('/v1/index');
})

app.get('/v1/messages', (req, res) => {
  let current_user = users_db.users.find(user => user.login === true);
  const messages = messages_db.allReceived(current_user.id);
  console.log(messages);
  // res.render('inbox',{messages});
})

//version two for rest api
app.post('/v2/auth/signup', (req, res) => {
  const newUser = users_db.create({
    'email': req.body.email,
    'firstName': req.body.firstName,
    'lastName': req.body.lastName,
    'password': req.body.password
  });
  res.json({"status":201,"data":[newUser]})
})

app.post('/v2/auth/login', (req, res)=>{
  let current_user = users_db.findOne(req.body.email);
  if(current_user && current_user.password === req.body.password){
    users_db.logIn(req.body.email);
    res.json({"status":200,"data":[current_user]})
  }
})


//listen for requests
app.listen(process.env.PORT || 4000, function () {
  console.log("now listening for request")
})