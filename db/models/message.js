const uid = require('rand-token').uid;

module.exports = {
    Message: class Message {
        constructor(sender) {
            this.messages = [];
            this.messageId = 0;
            this.sender = sender;
            this.recieverId = '';
            this.parentMessageId= 0;
        }
        create(data) {
            const newMessage = {
                'id': ++this.messageId,
                'senderId': this.sender.id,
                'recieverId': 0,
                'createdOn': new Date(),
                'subject': data.subject,
                'message': data.message,
                'parentMessageId':++this.parentMessageId,
                'status': data.status
            };
            this.messages.push(newMessage);
            return newMessage;
        }
        findOne(id) {
            return this.messages.find(message => message.id === id);
        }
        allSent(status) {
            return this.messages.filter((message) => {
                return message.status === 'sent';
            })
        }
        allDraft(status) {
            return this.messages.filter((message) => {
                return message.status === 'draft';
            })
        }
        allReceived(id){
            let theMessages = this.messages.filter(message=>message.recieverId === id);
            return theMessages.filter((message)=>{
                return message.status === "read" || message.status === "unread";
            })
        }
    }

}

// let allUsers = new user.User()

// userone = allUsers.create({
//     'id': uid(16),
//     'email': 'alevel7@gmail.com',
//     'firstName': 'Taiwo',
//     'lastName': 'kazeem',
//     'password': 'idkejibjh'
// })
// allUsers.create({
//     'id': uid(16),
//     'email': 'kazeem@gmail.com',
//     'firstName': 'Taiwo',
//     'lastName': 'kazeem',
//     'password': 'lkklaskd'
// })
// mess = {
//     'recieverEmail': 'kazeem@gmail.com',
//     'subject': 'letter of employment',
//     'message': 'be notified that you have been employed',
//     'status': 'sent'
// };
// m1 = new Message(userone)
// // console.log(allUsers.findOne('kazeem@gmail.com'));
// console.log(m1.create(mess))