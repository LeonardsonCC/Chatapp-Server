interface User {
  user_id?: number;
  session?: string;
  username: string;
  socket: SocketIO.Socket;
}

class User {
  user_id?: number;
  session?: string;
  username: string;
  socket: SocketIO.Socket;

  public constructor(userObj: User) {
    this.user_id = userObj.user_id;
    this.session = userObj.session;
    this.username = userObj.username;
    this.socket = userObj.socket;
  }
}

export default User;
