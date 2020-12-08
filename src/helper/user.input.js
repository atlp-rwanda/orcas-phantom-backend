import Joi from '@hapi/joi';

const signupInput = (req) => {
  const schema = Joi.object().keys({
    email: Joi.string().required().email(),
    username: Joi.string().required().min(3).max(30),
    password: Joi.string().required().min(6).max(15),
    role: Joi.string().required().valid('admin', 'bus'),
    busId: Joi.number().integer().required()
  });

  return schema.validate(req.body);
};

const UpdateInput = (req) => {
  const schema = Joi.object().keys({
    email: Joi.string().email(),
    username: Joi.string().min(6).max(30),
    password: Joi.string().min(6).max(15),
    role: Joi.string().valid('admin', 'bus'),
    busId: Joi.number().integer()
  });

  return schema.validate(req.body);
};

const loginInput = (req) => {
  const schema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(15)
  });

  return schema.validate(req.body);
};
const EmailInput = (req) => {
  const schema = Joi.object().keys({
    email: Joi.string().required().email()
  });

  return schema.validate(req.body);
};
const resetInput = (req) => {
  const schema = Joi.object().keys({
    token: Joi.string().required(),
    newPassword: Joi.string().required().min(6).max(15)
  });

  return schema.validate(req.body);
};
export {
  signupInput, UpdateInput, loginInput, EmailInput,
  resetInput
};
