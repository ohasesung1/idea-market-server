import { asyncForeach } from './method';
import models from '../models';
import baseConfig from '../../config/base.json';

// url 설정 함수
const urlData = (fileData) => {
  const requestAddress = baseConfig.base.replace;

  const fileType = fileData.type;

  const { uploadName } = fileData;

  const url = `${requestAddress}/image/${fileType}/${uploadName}.${fileType}`;

  return {
    fileType,
    url,
  };
};

// url 작성 및 DB저장 대숲
export const marketItemCreatImageUrlDB = async (picture, idx) => {
  await asyncForeach(picture, (value) => {
    const fileData = {
      marketIdx: idx,
      ...value,
    };

    // 파일 DB 저장
    models.MarketFile.create(fileData);

    const { url, fileType } = urlData(fileData);

    value.url = url;
    value.type = fileType;
  });
};

// 조회시 url 설정
export const creatImageUrl = async (picture) => {
  await asyncForeach(picture, (value) => {
    const fileData = {
      ...value,
    };

    const { url, fileType } = urlData(fileData);

    value.url = url;
    value.type = fileType;
  });
};
