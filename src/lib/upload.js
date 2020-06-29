/* eslint-disable import/prefer-default-export */
const fs = require('fs');
const path = require('path');
const multer = require('multer');

/* 로컬 업로드 */
export const uploadImgLocal = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const filePath = `src/public/${path.extname(file.originalname).slice(1)}`;
      // eslint-disable-next-line no-unused-expressions
      !fs.existsSync(filePath) && fs.mkdirSync(filePath);
      cb(null, filePath);
    },
    filename: (req, file, cb) => {
      console.log(path.extname(file.originalname).slice(1));
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
}).array('img');
