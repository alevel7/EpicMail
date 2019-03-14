const user = require('../db/models/User')
const message = require('../db/models/message')
const messages = new message.Message()
const Users = new user.user()

module.exports = {
    user_controller: class user {
        signUp(req, res) {
            if (!req.body.email || !req.body.firstName || !req.body.password) {
                return res.status(401).json({
                    'status': 401,
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
            // console.log(Users.db)
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

    },
    message_controller: class messenger {
        createMessage(req, res) {
            if (!req.body.from && !req.body.to && !req.body.subject) {
                return res.status(400).json({
                    'status': 400,
                    'data': ["sender and reciever mail is required"]
                })
            }
            let reciever = Users.findOne(req.body.to);
            let sender = Users.findOne(req.body.from);
            if (reciever) {
                let newMessage = messages.create(req.body)
                newMessage.senderId = sender.id;
                newMessage.recieverId = reciever.id;
                newMessage.senderStatus = "sent"
                newMessage.recieverStatus = "unread"
                newMessage = messages.save(newMessage)

                return res.status(201).json({
                    'status': 201,
                    'data': [newMessage]
                })

            } else {
                return res.status(400).json({
                    'status': 400,
                    'data': ["recipent is not registered"]
                })
            }



        }
        getAllMessages(req, res) {
            return res.status(200).json({
                'status': 200,
                'data': messages.allMessages()
            })
        }
        getAllSent(req, res) {
            return res.status(200).json({
                'status': 200,
                'data': messages.allOfSent("sent",0)
            })
        }
        getMail(req, res) {
            console.log('requested id is',req.params.id)
            let message = messages.findOne(parseInt(req.params.id))
            if (message) {
                return res.status(200).json({
                    'status': 200,
                    'data': [message]
                })
            } else {
                return res.status(200).json({
                    'status': 200,
                    'data': 'no message found'
                })
            }


        }
        deleteMail(req, res){
            let messageIndex = messages.db.findIndex(aMessage=>aMessage.id === parseInt(req.params.id))
            messages.db.splice(messageIndex, 1)
            if (message) {
                return res.status(200).json({
                    'status': 200,
                    'data': ["message deleted"]
                })
            } else {
                return res.status(404).json({
                    'status': 404,
                    'data': ['no message found']
                })
            }
        }
        getAllUnread(req, res) {
            //get all unread messages
            const allUnread = messages.allOfRecieved("unread",0);
            console.log(allUnread)
            //return a status 200 with unread messages
            return res.status(200).json({
                'status': 200,
                'data': allUnread
            })
        }
    }
}