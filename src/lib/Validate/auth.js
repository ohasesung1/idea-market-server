import BaseJoi from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

const Joi = BaseJoi.extend(JoiDate);

export const validateLogin = async (body) => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    pw: Joi.string().required(),
  });

  // eslint-disable-next-line no-useless-catch
  try {
    return await schema.validateAsync(body);
  } catch (error) {
    throw error;
  }
};

export const vaildateRegister = async (body) => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    pw: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
  });

  // eslint-disable-next-line no-useless-catch
  try {
    return await schema.validateAsync(body);
  } catch (error) {
    throw error;
  }
};
