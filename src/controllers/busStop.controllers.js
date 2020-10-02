import models from '../database/models';

const createBusStop = async (req, res) => {
  try {
    const busstop = await models.Bus.create(req.body);
    return res.status(201).json({
      busstop,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllBusStops = async (req, res) => {
  try {
    const busstops = await models.Bus.findAll();
    return res.status(200).json({ busstops });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getBusStopById = async (req, res) => {
  try {
    const { busStopId } = req.params;
    const busstop = await models.Bus.findOne({
      where: { id: busStopId },
    });
    if (busstop) {
      return res.status(200).json({ busstop });
    }
    return res.status(404).send('BusStop with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateBusStop = async (req, res) => {
  try {
    const { busStopId } = req.params;
    const [updated] = await models.busstop.update(req.body, {
      where: { id: busStopId },
    });
    if (updated) {
      const updatedBusStop = await models.busstop.findOne({ where: { id: busStopId } });
      return res.status(200).json({ post: updatedBusStop });
    }
    throw new Error('BusStop not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteBusStop = async (req, res) => {
  try {
    const { busStopId } = req.params;
    const deleted = await models.busstop.destroy({
      where: { id: busStopId },
    });
    if (deleted) return res.status(200).json({ message: 'BusStop deleted successfully.' });
    throw new Error('BusStop not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createBusStop,
  getAllBusStops,
  getBusStopById,
  updateBusStop,
  deleteBusStop,
};
