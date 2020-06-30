import { Request } from 'express';
import { User } from '../entity/User';
import { hash } from 'bcrypt';

export async function register(req: Request){
    const credentials = req.body;
    const hashedPassword = await hash(credentials.password, 12);

    try{
        await User.insert({
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            email: credentials.email,
            password: hashedPassword
        });
    }catch(err){
        console.log(err);
        return false;
    }
    return true;
}
