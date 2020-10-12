import Joi from '@hapi/joi';

const signupInput = (req) => {
  const schema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(15),
    role: Joi.string().required().valid('admin', 'bus'),
    busId: Joi.string().required()
  });

  return schema.validate(req.body);
};

const UpdateInput = (req) => {
  const schema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(6).max(15),
    role: Joi.string().valid('admin', 'bus'),
    busId: Joi.string()
  });

  return schema.validate(req.body);
};
export { signupInput, UpdateInput };
