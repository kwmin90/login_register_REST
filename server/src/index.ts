import "reflect-metadata";
import express from 'express';
import bodyParser from 'body-parser';
import {createConnection} from "typeorm";
import cors from 'cors';
import * as fs from 'fs';
import expressJwt from 'express-jwt';

import { login } from './routes/login.route';
import { register } from './routes/register.route';
import { user } from './routes/user.route';
import { refreshToken } from './routes/refresh.route';

const app = express();
const RSA_PUBLIC_KEY = fs.readFileSync('./public.key');
const checkIfAuthenticated = expressJwt({
    secret: RSA_PUBLIC_KEY,
    algorithms: ['RS256']
});

app.use(
    cors({
        origin: "http://localhost:4200",
        credentials: true
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

createConnection();

app.route('/api/login').post(login);
app.route('/api/register').post(register);
app.route('/api/user').get(checkIfAuthenticated, user);
app.route('/api/refresh_token').get(checkIfAuthenticated, refreshToken);

app.listen(3000, () =>{
    console.log('express server started');
});

