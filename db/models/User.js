// const moment = require('moment');
const uid = require('rand-token').uid;
    


module.exports = {
    User:class User {
        constructor() {
            this.users = []
            this.userId = 0;
        }
    
        create(data) {
            const newUser = {
                'token': uid(16),
                'id':++this.userId,
                'email': data.email || '',
                'firstName': data.firstName || '',
                'lastName': data.lastName || '',
                'password': data.password || '',
                'login':false
            };
            this.users.push(newUser);
            return newUser;
        }
        findOne(email) {
            return this.users.find(user => user.email === email);
        }
        getId(email){
            return this.findOne(email).id;
        }
        isLoggedIn(email){
            return this.findOne(email).login;
        }
        logIn(email){
            let index = this.users.indexOf(this.findOne(email));
            this.users[index].login = true;
            return true;
        }
    }
    
}



// let current = new user.User()
// console.log(typeof(current))

// current.create({
//     'id': uid(16),
//     'email': 'alevel7@gmail.com',
//     'firstName':'Taiwo',
//     'lastName': 'kazeem',
//     'password': 'idkejibjh'
// })
// current.create({
//     'id': uid(16),
//     'email': 'kazeem@gmail.com',
//     'firstName':'Taiwo',
//     'lastName': 'kazeem',
//     'password': 'lkklaskd'
// })

// // console.log(current.users);
// console.log(current.findOne('kazeem@gmail.com'));
// console.log(current.getId('kazeem@gmail.com'))