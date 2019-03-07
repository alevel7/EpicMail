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
            this.users = []
            this.id = 1;
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