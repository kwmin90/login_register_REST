import { User } from "../entity/User";
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import * as fs from 'fs';

const RSA_PUBLIC_KEY = fs.readFileSync('./public.key');

export async function user(req: Request, res: Response){
    const authorization = req.header('Authorization');
    if (!authorization) throw new Error("Not authorized");

    try{
        const token = authorization.split(" ")[1];
        const payload: any = verify(token, RSA_PUBLIC_KEY);
        const user = await User.findOne(payload.userId);
        if(!user) return null;
        const data = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        };
        return res.status(200).json({
            data
        });
    }catch(err){
        console.log(err);
        return null;
    }
}