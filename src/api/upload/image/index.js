import express from 'express';
import * as imageCtrl from './image.ctrl';  

import { uploadImgLocal } from '../../../lib/upload';

const image = express.Router();

image.route('/').post(uploadImgLocal, imageCtrl.uploadImgs);

export default image;
