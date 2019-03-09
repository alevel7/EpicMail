const uid = require('rand-token').uid;


module.exports = {
    currentUser: class User {
        constructor() {
        }
        create(data) {
            const newUser = {
                'token': uid(16),
                'email': data.email || '',
                'firstName': data.firstName || '',
                'lastName': data.lastName || '',
                'password': data.password || '',
                'login': false
            };
            return newUser;
        }

    },
    db: class user_db {
        constructor() {
            this.users = [ {
                "token": "S64N1bNiEK6994ua",
                "email": "kazeem@epicmail.com",
                "firstName": "kazem",
                "lastName": "me",
                "password": "sgff4356",
                "login": false,
                "id": 1
              },
              {
                "token": "Cq8CN0w9de42ge0i",
                "email": "alevel7@gmail.com",
                "firstName": "kazem",
                "lastName": "me",
                "password": "sgff4356",
                "login": false,
                "id": 2
              }]
            this.id = this.users.length+1;
        }
        save(user) {
            this.users.push(user);
            this.id++;
        }
        findOne(email) {
            return this.users.find(user => user.email === email);
        }
        getId(email) {
            return this.findOne(email);
        }
        isLoggedIn(email) {
            return this.findOne(email).login;
        }
        logIn(email) {
            let index = this.users.indexOf(this.findOne(email));
            this.users[index].login = true;
            return true;
        }
    }
}