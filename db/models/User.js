const uid = require('rand-token').uid;
class User{
    constructor(){
        this.db = []
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

export default User;