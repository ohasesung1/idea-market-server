import express from 'express';
import auth from './auth';
import upload from './upload';
import market from './market';

const router = express.Router();

router.use('/auth', auth);
router.use('/upload', upload);
router.use('/market', market);

export default router;
