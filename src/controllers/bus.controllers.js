import models from '../database/models';

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
    const bus = await models.Bus.findOne({
      where: { id: busId },
    });
    if (bus) {
      return res.status(200).json({ bus });
    }
    return res.status(404).json(
      { status: 404, message: 'Bus with the specified ID does not exist' }
    );
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
