import { AES } from 'crypto-ts';
import User from './User';
import { emmit } from '../Core/Events';

let actual_id:number = 0;

const getId = () => {
    actual_id++;
    return actual_id;
}

export default class {
    public UsersList: Array<User>;

    public constructor() {
        this.UsersList = [];
    }

    public returnLogin = (session: string) => {
        let [ UserFiltered ] = [...this.UsersList.filter(item => item.session == session)];
        emmit('new user', this.UsersList);
        return UserFiltered;
    }
    
    public userLogin = (user: User) => {
        user.user_id = getId();
        user.session = AES.encrypt(''+user.user_id, "teste").toString(),
        
        this.UsersList.push(user);
        console.log(user.username + ' is now connected!');
        
        emmit('new user', this.UsersList);
        return user;
    }
};