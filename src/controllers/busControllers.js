import models from '../database/models';

const createBus = async (req, res) => {
  try {
    const bus = await models.Bus.create(req.body);
    return res.status(201).json({
      bus,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllBuses = async (req, res) => {
  try {
    const buses = await models.Bus.findAll();
    return res.status(200).json({ buses });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getBusById = async (req, res) => {
  try {
    const { busId } = req.params;
    const bus = await models.Bus.findOne({
      where: { id: busId },
    });
    if (bus) {
      return res.status(200).json({ bus });
    }
    return res.status(404).send('Bus with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateBus = async (req, res) => {
  try {
    const { busId } = req.params;
    const [updated] = await models.Bus.update(req.body, {
      where: { id: busId },
    });
    if (updated) {
      const updatedBus = await models.Bus.findOne({ where: { id: busId } });
      return res.status(200).json({ post: updatedBus });
    }
    throw new Error('Bus not found');
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
    if (deleted) return res.status(200).json({ message: 'Bus deleted successfully.' });
    throw new Error('Bus not found');
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
