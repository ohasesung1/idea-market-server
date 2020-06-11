import express from 'express';
import image from './image';  

const upload = express.Router();

upload.use('/image', image);

export default upload;
