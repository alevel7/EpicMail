import User from '../db/models/User'
const Users = new User()

class user {
    signUp(req, res) {
        if (!req.body.email || !req.body.firstName || !req.body.password) {
            return res.status(400).json({
                'status': 400,
                'data': ["all fields are required"]
            })
        }
        if (Users.findOne(req.body.email)) {
            return res.status(400).json({
                'status': 400,
                'data': ["email already exist"]
            })
        }
        if (req.body.password !== req.body.password2) {
            return res.status(401).json({
                'status': 401,
                'data': ["password doesnt match"]
            })
        }
        const email = /[a-zA-Z0-9]*@epicmail\.com/
        if(!email.test(req.body.email)){
            return res.status(401).json({
                'status':401,
                'data':["invalid email address"]
            })
        }
        const newUser = Users.create(req.body)
        return res.status(201).json({
            'status': 201,
            'data': [newUser]
        })
    }
    signIn(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(401).json({
                'status': 401,
                'data': ["username and password are required"]
            })
        }

        let current_user = Users.findOne(req.body.email)
        if (!current_user) {
            return res.status(404).json({
                'status': 404,
                'data': ["username does not exist"]
            })
        } else if (current_user.password == req.body.password) {
            return res.status(200).json({
                'status': 200,
                'data': [current_user]
            })
        }
    }

}
export default user
export {Users}