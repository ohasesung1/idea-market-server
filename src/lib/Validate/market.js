import BaseJoi from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

const Joi = BaseJoi.extend(JoiDate);

export const validateWriteItem = async (body) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.string().required(),
    name: Joi.string().required(),
    picture: Joi.any(),
  });

  // eslint-disable-next-line no-useless-catch
  try {
    return await schema.validateAsync(body);
  } catch (error) {
    throw error;
  }
};

export const vaildateMarketFile = async (body) => {
  const schema = Joi.object().keys({
    uploadName: Joi.string().required(),
    type: Joi.string().required(),
  });

  // eslint-disable-next-line no-useless-catch
  try {
    return await schema.validateAsync(body);
  } catch (error) {
    throw error;
  }
};
