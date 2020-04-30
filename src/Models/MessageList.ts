import Message from './Message';
import User from './User';

let actual_id: number = 0;

const getId = () => {
  actual_id++;
  return actual_id;
};

export default class {
  public MessagesList: Array<Message>;

  public constructor() {
    this.MessagesList = [];
  }

  public sendNewMessage = (user: User, message: string) => {
    const new_message: Message = {
      message_text: message,
      message_id: getId(),
      user_id: user.user_id,
      username: user.username,
    };

    this.MessagesList.push(new_message);
    return new_message;
  };
}
