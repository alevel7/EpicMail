
module.exports = {
    Message: class Message {
        constructor() {
            this.db = []
            this.id = 0
        }
        create(data) {
            const newMessage = {
                'createdOn': new Date().toDateString(),
                'subject': data.subject,
                'message': data.message,
            };
            return newMessage;
        }
        save(data){
            data.id = this.id
            data.parentMessageId = this.id;
            this.id+=1;
            this.db.push(data)
            return data
        }

        findOne(id) {
            return this.db.find(message => message.id === id);
        }
        allMessages(){
            return this.db
        }
        allOfSent(status,id){
            return this.db.filter(message=>{
                return message.senderStatus == status && message.senderId === id
            })
        }
        allOfRecieved(status,id){
            return this.db.filter(message=>{
                return message.recieverStatus == status && message.recieverId === id
            })
        }
    }
}