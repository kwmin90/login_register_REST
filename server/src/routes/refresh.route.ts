import { Response, Request } from 'express';
import { User } from '../entity/User';
import { verify, sign } from 'jsonwebtoken';
import * as fs from 'fs';

const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./public.key');

export async function refreshToken(req: Request, res: Response){
    const authorization = req.header('Authorization');
    if (!authorization) return null;

    try{
        const token = authorization.split (" ")[1];
        const payload: any = verify(token, RSA_PUBLIC_KEY);
        const user = await User.findOne(payload.userId);
        if(!user) return null;
        const refresh_token = sign({userId: user.id}, RSA_PRIVATE_KEY,{
            algorithm: 'RS256',
            expiresIn: '7d'
        });
        return res.status(200).json({
            idToken: refresh_token
        })
    }catch(err){
        console.log(err);
        return null;
    }
}