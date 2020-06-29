import * as colorConsole from '../../../lib/console';

/* eslint-disable import/prefer-default-export */
export const uploadImgs = (req, res) => {
  const imgs = [];
  const { files } = req;

  if (files.length === 0) {
    const result = {
      status: 400,
      message: '이미지를 첨부 하세요',
    };
    res.status(400).json(result);

    return;
  }

  files.forEach((file) => {
    const uploadName = file.filename;
    const fileData = uploadName.split('.');
    imgs.push({ fileName: fileData[0], fileType: fileData[1] });
  });

  const result = {
    status: 200,
    message: '이미지 업로드 성공',
    data: {
      imgs,
    },
  };
  res.status(200).json(result);

  colorConsole.green('이미지 업로드 성공');
};
