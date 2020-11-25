import redis from 'redis';
/* eslint-disable max-len */
import models from '../database/models';

const client = redis.createClient();

const createBus = async (req, res) => {
  try {
    const existBus = await models.Bus.findOne(
      { where: { bus_plate: req.body.bus_plate } }
    );
    if (existBus) {
      return res.status(409).json(
        { status: 409, message: 'The bus already exist' }
      );
    }
    const bus = await models.Bus.create(req.body);
    return res.status(201).json(
      { status: 201, message: 'Bus created successfully', bus }
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllBuses = async (req, res) => {
  try {
    const buses = await models.Bus.findAll();
    if (buses.length < 1) {
      return res.status(404).json(
        { status: 404, message: 'There are no available buses' }
      );
    }
    return res.status(200).json({ buses });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getBusById = async (req, res) => {
  try {
    const { busId } = req.params;
    client.get('buses', async (err, reply) => {
      const bus = await models.Bus.findOne({
        where: { id: busId },
      });
      if (bus) {
        const busUpdate = {
          bus_status: bus.bus_status,
          bus_plate: bus.bus_plate,
          routId: bus.routId,
          currentLocation: reply
        };

        const [updated] = await models.Bus.update(busUpdate, {
          where: { id: busId },
        });
        if (updated) {
          const updatedBus = await models.Bus.findOne({ where: { id: busId } });
          return res.status(200).json(
            {
              status: 200,
              bus: updatedBus
            }
          );
        }
      }
      return res.status(404).json(
        { status: 404, message: 'Bus with the specified ID does not exist' }
      );
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateBus = (req, res) => {
  try {
    models.Route.findByPk(req.body.routId)
      .then(async (rt) => {
        const { busId } = req.params;

        if (req.body.bus_status == 'active') {
          const allCoordinates = rt.routeData.routes[0].geometry.coordinates;

          let seconds = 0;
          // eslint-disable-next-line no-use-before-define
          const timeInt = setInterval(timeDisp, 1000);

          // eslint-disable-next-line require-jsdoc
          function timeDisp() {
            // eslint-disable-next-line no-plusplus
            const currentPlace = `${allCoordinates[seconds].join(', ').split()}`;

            client.set('buses', JSON.stringify({
              busId,
              currentLocation: currentPlace
            }));

            if (seconds === allCoordinates.length - 1) {
              clearInterval(timeInt);
            } else {
              // eslint-disable-next-line no-plusplus
              seconds++;
            }
          }
          const busUpdate = {
            bus_status: req.body.bus_status,
            bus_plate: req.body.bus_plate,
            routId: req.body.routId,
            currentLocation: req.body.currentLocation
          };
          const [updated] = await models.Bus.update(busUpdate, {
            where: { id: busId },
          });
          if (updated) {
            const updatedBus = await models.Bus.findOne({ where: { id: busId } });
            return res.status(200).json(
              {
                status: 200,
                message: 'Bus was updated successfully.',
                bus: updatedBus
              }
            );
          }
          return res.status(404).json(
            { status: 404, message: `Bus with ID ${busId} was not found` }
          );
        } else {
          const busUpdate = {
            bus_status: req.body.bus_status,
            bus_plate: req.body.bus_plate,
            routId: req.body.routId,
            currentLocation: req.body.currentLocation
          };
          const [updated] = await models.Bus.update(busUpdate, {
            where: { id: busId },
          });
          if (updated) {
            const updatedBus = await models.Bus.findOne({ where: { id: busId } });
            return res.status(200).json(
              {
                status: 200,
                message: 'Bus was updated successfully.',
                bus: updatedBus
              }
            );
          }
          return res.status(404).json(
            { status: 404, message: `Bus with ID ${busId} was not found` }
          );
        }
      });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteBus = async (req, res) => {
  try {
    const { busId } = req.params;
    const deleted = await models.Bus.destroy({
      where: { id: busId },
    });
    if (deleted) {
      return res.status(200).json(
        { status: 200, message: 'Bus deleted successfully.' }
      );
    }
    return res.status(404).json(
      {
        status: 404,
        message: `Cannot delete Bus with id ${busId}. Bus not found!`
      }
    );
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
};
