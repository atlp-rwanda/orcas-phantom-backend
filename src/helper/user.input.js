import Joi from 'joi';

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
    email: Joi.string().optional().email(),
    password: Joi.string().optional().min(6).max(15),
    role: Joi.string().optional().valid('admin', 'bus'),
    busId: Joi.string().optional()
  });

  return schema.validate(req.body);
};
export { signupInput, UpdateInput };
