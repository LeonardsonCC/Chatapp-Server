import fs from 'fs';
import { on } from './Events';

export const onNewUser = () => {
    
}

export const write = () => {
    on('new user', (users:any) => {
        fs.writeFile('./src/tmp/db.json', JSON.stringify(users), (err) => {
            console.log(err);
        });
    });
    
}