import Sequelize from 'sequelize';
import model from '../database/models';

export const addRoute = async (req, res) => {
  const rt = {
    originID: req.body.origin,
    destinationID: req.body.destination,
    busStops: req.body.busStops
  };
  try {
    const checkOrigin = await model.busStops.findByPk(rt.originID);
    if (!checkOrigin) {
      return res.status(404).json(
        { status: 404, message: 'The Bus stop for origin does not exist' }
      );
    }
    const checkDestination = await model.busStops.findByPk(
      req.body.destination
    );
    if (!checkDestination) {
      return res.status(404).json(
        { status: 404, message: 'The Bus stop for destination does not exist' }
      );
    }
    if (rt.originID != rt.busStops[0]
      || rt.destinationID != rt.busStops[rt.busStops.length - 1]
    ) {
      return res.status(409).json(
        {
          status: 409,
          message: 'Route Origin and destination mismacth their busStop'
        }
      );
    }
    const checkDuplicate = () => {
      for (let i = 0; i < rt.busStops.length; i += 1) {
        for (let j = i + 1; j < rt.busStops.length; j += 1) {
          if (rt.busStops[i] == rt.busStops[j]) {
            return true;
          }
        }
        return false;
      }
    };
    if (checkDuplicate()) {
      return res.status(409).json(
        { status: 409, message: 'You have entered duplicate bus stops' }
      );
    }
    const { Op } = Sequelize;
    const result = await model.busStops.count({
      where: {
        id: { [Op.in]: rt.busStops }
      }
    });
    if (result != rt.busStops.length) {
      return res.status(409).json(
        { status: 409, message: 'One of the bus stop does not exist' }
      );
    }
    const bs = await model.busStops.findAll({
      where: {
        id: { [Op.or]: rt.busStops }
      }
    });
    const names = [];
    bs.forEach((element) => {
      names.push(element.busStopName);
    });
    const rtName = names.join('-');
    rt.name = rtName;
    const existRoute = await model.Route.findOne(
      {
        where: { name: rt.name }
      }
    );
    if (existRoute) {
      return res.status(409).json(
        {
          status: 409,
          message: `The Route with name ${rt.name} already exist`
        }
      );
    }
    const route = await model.Route.create(rt);
    return res.status(201).json(
      { status: 201, message: 'The Route created successfully', route }
    );
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export const getAllRoutes = (req, res) => {
  model.Route.findAll()
    .then((route) => {
      if (route.length < 1) {
        return res.status(404).json(
          { status: 404, message: 'There are no available Routes' }
        );
      }
      const allRoutes = route.sort((a, b) => (new Date(b.updatedAt)).getTime()
          - (new Date(a.updatedAt).getTime()));
      res.status(200).json(allRoutes);
    })
    .catch();
};
export const getSpecificRoute = (req, res) => {
  const { id } = req.params;
  model.Route.findByPk(id)
    .then((rt) => {
      if (!rt) return res.status(404).json({ message: 'Route Not found!' });
      res.status(200).json({ status: 200, rt });
    })
    .catch((err) => res.status(500).json({ message: err }));
};
export const deleteSpecificRoute = (req, res) => {
  const { id } = req.params;
  model.Route.destroy({
    where: { id }
  })
    .then((rt) => {
      if (rt == 1) {
        return res.status(200).json(
          { message: 'Route has been deleted successfully.' }
        );
      }
      res.status(404).json(
        { status: 404, message: `Cannot delete route with id = ${id}` }
      );
    })
    .catch((err) => res.status(500).json({ message: err }));
};
export const updateSpecificRoute = (req, res) => {
  const { id } = req.params;
  model.Route.update(req.body, {
    where: { id }
  })
    .then((rt) => {
      if (rt == 1) {
        return res.status(200).json(
          { message: 'Route updated successfully.' }
        );
      }
      res.status(404).json(
        { status: 404, message: `Cannot update Route with id = ${id}` }
      );
    })
    .catch((err) => res.status(500).json({ message: err }));
};
