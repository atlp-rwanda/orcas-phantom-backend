import Joi from '@hapi/joi';

const busInput = (req) => {
  const schema = Joi.object().keys({
    routId: Joi.number().integer().required().min(1)
      .max(150),
    bus_plate: Joi.string().required().min(5),
    currentLocation: Joi.string().required().custom((value, helper) => {
      const coordinates = req.body.currentLocation.split(',');
      if (!req.body.currentLocation.includes(',')) {
        return helper.message(
          'Latitude and Longitude must be separated by comma'
        );
      }
      const lat = coordinates[0].trim();
      const long = coordinates[1].trim();
      const valRegex = /^-?[0-9]*[.]?[0-9]*$/;

      if (!valRegex.test(lat)) {
        return helper.message('Latitude must be numbers');
      }
      if (!valRegex.test(long)) {
        return helper.message('Longitude must be numbers');
      }
    }),
    bus_status: Joi.string().valid('active', 'inactive').default('inactive'),
  });
  return schema.validate(req.body);
};

const busUpdateInput = (req) => {
  const schema = Joi.object().keys({

    routId: Joi.number().integer().min(1)
      .max(150),
    bus_plate: Joi.string().min(5),
    currentLocation: Joi.string().custom((value, helper) => {
      const coordinates = req.body.currentLocation.split(',');
      if (!req.body.currentLocation.includes(',')) {
        return helper.message(
          'Latitude and Longitude must be separated by comma'
        );
      }
      const lat = coordinates[0].trim();
      const long = coordinates[1].trim();
      const valRegex = /^-?[0-9]*[.]?[0-9]*$/;

      if (!valRegex.test(lat)) {
        return helper.message('Latitude must be numbers');
      }
      if (!valRegex.test(long)) {
        return helper.message('Longitude must be numbers');
      }
    }),
    bus_status: Joi.string().valid('active', 'inactive').default('inactive')
    ,
  });

  return schema.validate(req.body);
};

export { busInput, busUpdateInput };
