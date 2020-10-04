import Joi from '@hapi/joi';

export const routeInput = (req) => {
  const schema = Joi.object().keys({
    name: Joi.string().required().min(6).max(100),
    origin: Joi.number().integer(),
    destination: Joi.number().integer(),
    busStops: Joi.array().required()
  });

  return schema.validate(req.body);
};

export const routeUpdateInput = (req) => {
  const schema = Joi.object().keys({
    name: Joi.string().required().min(6).max(100),
    origin: Joi.number().integer(),
    destination: Joi.number().integer(),
    busStops: Joi.array().required()
  });
  return schema.validate(req.body);
};
