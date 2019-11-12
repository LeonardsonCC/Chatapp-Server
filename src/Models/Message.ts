interface Message {
    user_id?: number,
    username: string,
    message_id: number,
    message_text: string,
}

class Message {
    user_id?: number;
    username: string;
    message_id: number;
    message_text: string;

    public constructor(messageObj: Message) {
        this.user_id = messageObj.user_id;
        this.username = messageObj.username;
        this.message_id = messageObj.message_id;
        this.message_text = messageObj.message_text;

    }
};

export default Message;