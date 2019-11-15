import { AES } from 'crypto-ts';
import { emmit } from '../Core/Events';
import { writeData } from '../Core/File';

import User from './User';

let actual_id: number = 0;

const getId = () => {
  actual_id++;
  return actual_id;
};

export default class {
  public UsersList: Array<User>;

  public constructor(users?: Array<User> | any) {
    let userListParam: Array<User> = [];
    if (users) {
      userListParam = users;
    }
    this.UsersList = userListParam;
  }

  public returnLogin = (session: string) => {
    let [UserFiltered] = [
      ...this.UsersList.filter(item => item.session == session),
    ];
    this.saveChanges();
    return UserFiltered;
  };

  public userLogin = (user: User) => {
    user.user_id = getId();
    (user.session = AES.encrypt('' + user.user_id, 'teste').toString()),
      this.UsersList.push(user);
    console.log(user.username + ' is now connected!');

    this.saveChanges();
    return user;
  };

  public saveChanges = () => {
    writeData(this.UsersList)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  };
}
