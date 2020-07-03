import { Request, Response } from 'express';
import { User } from '../entity/User';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import * as fs from 'fs';

const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

export async function login(req: Request, res: Response){
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({where: {email}})

    if(!user) return res.send({ok: false, message: "Could not find user"});

    const valid = await compare(password, user.password);

    if(!valid) return res.send({ok: false, message: "Wrong password"});

    const jwtBearerToken = sign({userId: user.id}, RSA_PRIVATE_KEY,{
        algorithm: 'RS256',
        expiresIn: '15m'
    });

    return res.status(200).json({
        idToken: jwtBearerToken,
        email
    });
}


