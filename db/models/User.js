const uid = require('rand-token').uid;
module.exports={
    user:class User{
    constructor(){
        this.db = [{
            "email": "alevel7@epicmail.com",
            "firstName": "kazem",
            "lastName": "me",
            "password": "12345",
            "id":0    
        }]
        this.id = this.db.length
    }
    create(data){
        const newUser={
            token:uid(16),
            email:data.email,
            firstName:data.firstName,
            lastName:data.lastName,
            password:data.password,
        }
        newUser.id = this.id
        this.id+=1;
        this.db.push(newUser)
        return newUser;
    }
    findOne(email){
        return this.db.find(user=>user.email == email)
    }
    findAll(){
        return this.db
    }
    deleteOne(email){
        let index = this.db.findIndex(email=>email.email === email)
        this.db.splice(index, 1)
        return {}
    }

}
}