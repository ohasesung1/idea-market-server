import express from 'express';
import * as marketCtrl from './market.ctrl';
import authMiddleWare from '../../middleware/auth';

const market = express.Router();

market.post('/', authMiddleWare, marketCtrl.writeItem);
market.get('/', marketCtrl.getAllItemList);

export default market;
