import { AES } from 'crypto-ts';
import { emmit } from '../Core/Events';

import User from './User';

let actual_id: number = 0;

const getId = () => {
  actual_id++;
  return actual_id;
};

export default class {
  public UsersList: Array<User>;

  public constructor() {
    this.UsersList = [];
  }

  public returnLogin = (session: string) => {
    let [UserFiltered] = [
      ...this.UsersList.filter(item => item.session == session),
    ];
    if (UserFiltered) {
      return UserFiltered;
    }
    return null;
  };

  public userLogin = (user: User) => {
    user.user_id = getId();
    (user.session = AES.encrypt('' + user.user_id, 'teste').toString()),
      this.UsersList.push(user);
    console.log(user.username + ' is now connected!');

    return user;
  };

  public saveChanges = () => {
      return true;
  };
}
