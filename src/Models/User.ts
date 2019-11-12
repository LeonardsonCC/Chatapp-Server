interface User {
    user_id?: number;
    session?: string;    
    username: string;
}

class User {
    user_id?: number;
    session?: string;
    username: string;

    public constructor(userObj: User) {
        this.user_id = userObj.user_id;
        this.session = userObj.session;
        this.username = userObj.username;
    }
};

export default User;