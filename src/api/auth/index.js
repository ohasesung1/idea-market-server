import express from 'express';
import authMiddleWare from '../../middleware/auth';
import * as authCtrl from './auth.ctrl';

const auth = express.Router();

auth.post('/login', authCtrl.login);
auth.get('/my', authMiddleWare, authCtrl.myInfo);

export default auth;
