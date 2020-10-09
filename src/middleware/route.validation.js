import { routeInput, routeUpdateInput } from '../helper/route.input';

const validateRouteInput = (req, res, next) => {
  const { error } = routeInput(req);
  if (error) {
    res.status(400).json({ status: res.statusCode, error: error.details[0].message });
  }

  next();
};

const validateUpdateRouteInput = (req, res, next) => {
  const { error } = routeUpdateInput(req);
  if (error) {
    res.status(400).json({ status: res.statusCode, error: error.details[0].message });
  }
  next();
};
export { validateRouteInput, validateUpdateRouteInput };
