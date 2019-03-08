const chai = require('chai');
const expect = require('chai').expect;
const assert = require("chai").assert;

chai.use(require('chai-http'));

const app = require('../index');
let randtoken = require('rand-token');

describe('rest api tests', function () {
    this.timeout(5000) //how long to await a response in ms
    describe('Api endpoint  /v2/auth/signup', function () {

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
    
})