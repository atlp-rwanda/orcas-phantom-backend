import Joi from '@hapi/joi';

const busStopInputVal = (req) => {
  const schema = Joi.object().keys({
    busStopName: Joi.string().required().min(5),
    coordinate: Joi.string().required(),
    sector: Joi.string().required(),
    district: Joi.string().required(),
  });

  return schema.validate(req.body);
};
const busStopUpdateInputVal = (req) => {
  const schema = Joi.object().keys({

    busStopName: Joi.string().min(5),
    coordinate: Joi.string(),
    sector: Joi.string(),
    district: Joi.string()
  });

  return schema.validate(req.body);
};
export { busStopInputVal, busStopUpdateInputVal };
