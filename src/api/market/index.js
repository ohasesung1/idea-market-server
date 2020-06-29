import express from 'express';
import * as marketCtrl from './market.ctrl';
import authMiddleWare from '../../middleware/auth';

const market = express.Router();

market.post('/', authMiddleWare, marketCtrl.writeItem);
market.get('/', marketCtrl.getAllItemList);
market.get('/detail', marketCtrl.getMarketDetail);
market.post('/basket', authMiddleWare, marketCtrl.addBasket);
market.delete('/basket', authMiddleWare, marketCtrl.deleteBasket);
market.get('/basket', authMiddleWare, marketCtrl.getMyBasket);

export default market;
