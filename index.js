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

app.get('/v2/index', (req, res) => {
  const signin = 'signin';
  res.render('index', {
    signin: signin
  })
})

app.get('/v2/auth/signup', (req, res) => {
  const signup = 'signup';
  res.render('signUp', {
    signup: signup
  })
})
app.post('/v2/auth/signup', (req, res) => {
  const newUser = users_db.create({
    'email': req.body.email,
    'firstName': req.body.firstName,
    'lastName': req.body.lastName,
    'password': req.body.password
  });
  req.flash('success_msg', 'Registeration Successful,please login ')
  res.redirect('/v2/index');
})

//create user in rest
app.post('/v1/auth/signup', (req, res) => {
  const newUser = users_db.create({
    'email': req.body.email,
    'firstName': req.body.firstName,
    'lastName': req.body.lastName,
    'password': req.body.password
  });
  res.json({"status":201,"data":[newUser]})
})




//listen for requests
app.listen(process.env.PORT || 4000, function () {
  console.log("now listening for request")
})