import Message from '../db/models/message';
import {
    Users
} from './user_controller';
const messages = new Message();

class messenger {
    createMessage(req, res) {
        if (!req.body.from || !req.body.to && !req.body.subject) {
            return res.status(400).json({
                'status': 400,
                'data': ["one or more omitted field is required"]
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
            'data': messages.allOfSent("sent", 0)
        })
    }
    getMail(req, res) {
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
    deleteMail(req, res) {
        let messageIndex = messages.db.findIndex(aMessage => aMessage.id == parseInt(req.params.id))
        if (messageIndex >= 0) {
            let deleted = messages.db.splice(messageIndex, 1);
            return res.status(200).json({
                'status': 200,
                'data': [`message with id ${messageIndex} deleted`]
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
        const allUnread = messages.allOfRecieved("unread", 0);
        //return a status 200 with unread messages
        return res.status(200).json({
            'status': 200,
            'data': allUnread
        })
    }
}

export default messenger