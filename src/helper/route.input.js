import Joi from '@hapi/joi';

export const routeInput = (req) => {
  const schema = Joi.object().keys({
    origin: Joi.number().integer(),
    destination: Joi.number().integer(),
    busStops: Joi.array().min(2).items(Joi.number().integer()).required()
  });

  return schema.validate(req.body);
};

export const routeUpdateInput = (req) => {
  const schema = Joi.object().keys({
    origin: Joi.number().integer(),
    destination: Joi.number().integer(),
    busStops: Joi.array().min(2).items(Joi.number().integer())
  });
  return schema.validate(req.body);
};
