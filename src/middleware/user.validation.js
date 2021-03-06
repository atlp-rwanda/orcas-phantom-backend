import {
  signupInput, UpdateInput, loginInput, EmailInput,
  resetInput
} from '../helper/user.input';

const userSignupInput = (req, res, next) => {
  const { error } = signupInput(req);
  if (error) {
    res.status(400).json(
      { status: res.statusCode, error: error.details[0].message }
    );
  }
  next();
};

const userUpdateInput = (req, res, next) => {
  const { error } = UpdateInput(req);
  if (error) {
    res.status(400).json(
      { status: res.statusCode, error: error.details[0].message }
    );
  }
  next();
};

const userLoginInput = (req, res, next) => {
  const { error } = loginInput(req);
  if (error) {
    res.status(400).json(
      { status: res.statusCode, error: error.details[0].message }
    );
  }
  next();
};
const userResetInput = (req, res, next) => {
  const { error } = resetInput(req);
  if (error) {
    res.status(400).json(
      { status: res.statusCode, error: error.details[0].message }
    );
  }
  next();
};
const userEmailInput = (req, res, next) => {
  const { error } = EmailInput(req);
  if (error) {
    res.status(400).json(
      { status: res.statusCode, error: error.details[0].message }
    );
  }
  next();
};
export {
  userSignupInput, userUpdateInput,
  userLoginInput, userEmailInput,
  userResetInput
};
