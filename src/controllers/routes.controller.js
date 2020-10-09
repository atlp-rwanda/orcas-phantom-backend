import model from '../database/models';

export const addRoute = (req, res) => {
  const rt = {
    name: req.body.name,
    originID: req.body.origin,
    destinationID: req.body.destination,
    busStops: req.body.busStops
  };

  model.Route.findOne({ where: { name: req.body.name } })
    .then((rout) => {
      if (rout) return res.status(409).json({ status: 409, message: 'The Route already exist' });
      model.Route.create(rt)
        .then((data) => {
          res.status(201).json({ status: 201, message: 'Route created successfully', data });
        })
        .catch((err) => res.status(500).json({ status: 404, message: err }));
    })
    .catch((err) => res.status(500).json({ status: 404, message: err }));
};

export const getAllRoutes = (req, res) => {
  model.Route.findAll()
    .then((route) => {
      if (route.length < 1) return res.status(404).json({ status: 404, message: 'There are no available Routes' });
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
      if (rt == 1) return res.status(200).json({ message: 'Route has been deleted successfully.' });

      res.status(404).json({ status: 404, message: `Cannot delete route with id = ${id}` });
    })
    .catch((err) => res.status(500).json({ message: err }));
};

export const updateSpecificRoute = (req, res) => {
  const { id } = req.params;

  model.Route.update(req.body, {
    where: { id }
  })
    .then((rt) => {
      if (rt == 1) return res.status(200).json({ message: 'Route updated successfully.' });

      res.status(404).json({ status: 404, message: `Cannot update Route with id = ${id}` });
    })
    .catch((err) => res.status(500).json({ message: err }));
};
