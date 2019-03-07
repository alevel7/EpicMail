const uid = require('rand-token').uid;
module.exports = {
        Message: class Message {
            constructor(sender) {
                this.messageId = 0;
                this.parentMessageId = 0;
            }
            create(data) {
                const newMessage = {
                    'senderId': data.senderId,
                    'recieverId': data.recieverId,
                    'createdOn': new Date(),
                    'subject': data.subject,
                    'message': data.message,
                    'status': data.status
                };
                return newMessage;
            }
        },
        db: class message_db {
            constructor() {
                this.messages = [];
                this.id = 1;
            }
            save(message) {
                this.messages.push(message);
                this.id++;
            }
            findOne(id) {
                return this.messages.find(message => message.id === id);
            }
            allSent(status) {
                return this.messages.filter((message) => {
                    return message.status === status;
                })
            }
            
            allUnread(status) {
                return this.messages.filter((message) => {
                    return message.status === status;
                })
            }
            allDraft(status) {
                return this.messages.filter((message) => {
                    return message.status === 'draft';
                })
            }
            allReceived(id) {
                let theMessages = this.messages.filter(message => message.recieverId === id);
        
                return theMessages.filter((message) => {
                    return message.status === "read" || message.status === "unread";
                })
            }
        }
    }