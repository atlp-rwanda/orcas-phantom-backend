import { busInput, busUpdateInput } from '../helper/bus.inputs';

const validateBusInput = (req, res, next) => {
  const { error } = busInput(req);
  if (error) {
    return res.status(400).json({
      status: res.statusCode, error: error.details[0].message
    });
  }

  next();
};

const validateUpdateBusInput = (req, res, next) => {
  const { error } = busUpdateInput(req);
  if (error) {
    return res.status(400).json({
      status: res.statusCode, error: error.details[0].message
    });
  }

  next();
};
export { validateBusInput, validateUpdateBusInput };
