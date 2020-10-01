import { busStopInputVal, busStopUpdateInputVal } from '../helper/busStop.input';

const busStopInput = (req, res, next) => {
  const { error } = busStopInputVal(req);
  if (error) {
    res.status(400).json({ status: res.statusCode, error: error.details[0].message });
  }

  next();
};
const busStopUpdateInput = (req, res, next) => {
  const { error } = busStopUpdateInputVal(req);
  if (error) {
    res.status(400).json({ status: res.statusCode, error: error.details[0].message });
  }

  next();
};

export { busStopInput, busStopUpdateInput };
