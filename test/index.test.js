const expect = require('chai').expect;
const request = require('supertest');
const assert = require("chai").assert;
const index = require('../index');
var randtoken = require('rand-token');




describe('Index', ()=>{
    describe('POST /auth/signup'),()=>{
        it("Create a new User", (done)=>{
            request(index).post('/api/v1/users')
            .send(
                {
                    'email': 'kazeem@gmail.com',
                    'firstName': 'Taiwo',
                    'lastName': 'kazeem',
                    'password': 'lkklaskd'
                }
            )
            .then((res)=>{
                const body = req.body;
                expect(body).to.contain.property('id');
                expect(body).to.contain.property('email');
                expect(body).to.contain.property('firstName');
                expect(body).to.contain.property('lastName');
                expect(body).to.contain.property('password');
                done();
            })
        })
    }
})
