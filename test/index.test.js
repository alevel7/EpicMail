const chai = require('chai');
const expect = require('chai').expect;
const assert = require("chai").assert;

chai.use(require('chai-http'));

const app = require('../index');
let randtoken = require('rand-token');

describe('rest api tests', function () {
    this.timeout(5000) //how long to await a response in ms
    describe('Api endpoint POST /v2/auth/signup', function () {

        it("should create a new user", function () {
            return chai.request(app)
                .post('/v2/auth/signup')
                .send({
                    "email": "kazeem@epicmail.com",
                    "firstName": "kazem",
                    "lastName": "me",
                    "password": "sgff4356"
                })
                .then(function (res) {
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body).to.be.an('object');
                })
        })

        it("should return bad request", function () {
            return chai.request(app)
                .post('/v2/auth/signup')
                .send({
                    "email": "",
                    "firstName": "",
                    "lastName": "",
                    "password": ""
                })
                .then(function (res) {
                    expect(res).to.have.status(406);
                    throw new Error('email and password not supplied');
                })
                .catch(function (err) {
                    console.log(err.message);
                })

        })
    })
    describe("Api endpoint POST /v2/auth/login", function () {
        it("return user details if user exist", function () {
            return chai.request(app)
                .post("/v2/auth/login")
                .send({
                    "email": "kazeem@epicmail.com",
                    "password": "sgff4356"
                })
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.data[0]).to.have.property('login');
                    expect(res.body.data[0].login).to.equal(true)
                })
        });

        it("should return status 406 with no data when email/password is wrong", function () {
            return chai.request(app)
                .post("/v2/auth/login")
                .send({
                    "email": "kazeem@epicmail.com",
                    "password": ''
                })
                .then(function (res) {
                    expect(res).to.have.status(404)
                })
        })
    });
    describe("Api endpoint POST /v2/messages", function () {
        it("create a new message with status 201", function () {
            return chai.request(app)
                .post('/v2/messages')
                .send({
                    "from": 1,
                    "subject": "entry cup championship",
                    "message": "win to win the championship",
                    "status": "sent",
                    "to": 2
                })
                .then(function (res) {
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body).to.be.an('object');
                    expect(res.body.data[0].status).to.equal('sent');
                })
        })
        it("should return bad requst with status 406", function () {
            return chai.request(app)
                .post('/v2/messages')
                .send({
                    "from": null,
                    "subject": "entry cup championship",
                    "message": "win to win the championship",
                    "status": "sent",
                    "to": 2
                })
                .then(function (res) {
                    expect(res).to.have.status(406);
                    expect(res).to.be.json;
                })
        })
    })
    describe("Api endpoint GET /v2/messages",function(){
        it("should return all ")
    })
})