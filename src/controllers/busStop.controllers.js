import Sequelize from 'sequelize';
import models from '../database/models';

// prettier-ignore

const createBusStop = (req, res) => {
  const bust = {
    busStopName: req.body.busStopName,
    coordinate: req.body.coordinate,
    sector: req.body.sector,
    district: req.body.district
  };
  models.busStops.findOne(
    {
      where:
      Sequelize.or(
        { busStopName: req.body.busStopName },
        { coordinate: req.body.coordinate }
      )
    }
  )
    .then((busstopFound) => {
      if (busstopFound) {
        return res.status(409).json(
          { status: 409, message: 'Bus Stop already Exist' }
        );
      }
      models.busStops.create(bust)
        .then((data) => {
          res.status(201).json(
            { status: 201, message: 'bus Stop created successfully', data }
          );
        })

        .catch(() => res.status(500).json(
          { status: 500, message: 'server error!' }
        ));
    });
};

const getAllBusStops = (req, res) => {
  models.busStops.findAll()
    .then((bust) => {
      if (bust.length < 1) {
        return res.status(404).json(
          { status: 404, message: 'There are no available Busstop' }
        );
      }
      const allBusStops = bust.sort((a, b) => (new Date(b.updatedAt)).getTime()
          - (new Date(a.updatedAt).getTime()));

      return res.status(200).json(allBusStops);
    })
    .catch(() => res.status(500).json(
      { status: 500, message: 'server error!' }
    ));
};

const getAllBusStopsGeoJson = (req, res) => {
  models.busStops.findAll()
    .then((bust) => {
      if (bust.length < 1) {
        return res.status(404).json(
          { status: 404, message: 'There are no available Busstop' }
        );
      }
      const allBusStops = bust.sort((a, b) => (new Date(b.updatedAt)).getTime()
          - (new Date(a.updatedAt).getTime()));

      if (req.query.type !== undefined
        && req.query.type.toLowerCase() === 'geojson') {
        const geoJsonBusStops = {
          type: 'FeatureCollection',
          features: allBusStops.map((busStop) => ({
            type: 'Feature',
            properties: {
              id: busStop.id,
              busStopName: busStop.busStopName,
              sector: busStop.sector,
              district: busStop.district,
              createdAt: busStop.createdAt,
              updatedAt: busStop.updatedAt,
            },
            geometry: {
              type: 'Point',
              coordinates: [
                busStop.coordinate.split(',')[0],
                busStop.coordinate.split(',')[1],
              ],
            },
          })),
        };

        return res.status(200).json(geoJsonBusStops);
      }
      return res.status(422).json({});
    })
    .catch(() => res.status(500).json(
      { status: 500, message: 'server error!' }
    ));
};

const getBusStopById = (req, res) => {
  const { id } = req.params;

  models.busStops.findByPk(id)
    .then((bust) => {
      if (!bust) {
        return res.status(404).json(
          { status: 404, message: 'busstop Not found!' }
        );
      }

      res.status(200).json({ status: 200, bust });
    })
    .catch(() => res.status(500).json(
      { status: 500, message: 'server error!' }
    ));
};

const deleteBusStop = (req, res) => {
  const { id } = req.params;

  models.busStops.destroy({
    where: { id }
  })
    .then((bust) => {
      if (bust === 1) {
        return res.status(200).json(
          { message: 'busstop has been deleted successfully.' }
        );
      }

      res.status(404).json(
        { status: 404, message: `Cannot delete busstop with id = ${id}` }
      );
    })
    .catch(() => res.status(500).json(
      { status: 500, message: 'server error!' }
    ));
};

const updateBusStop = (req, res) => {
  const { id } = req.params;

  models.busStops.update(req.body, {
    where: { id }
  })
    .then((bust) => {
      // eslint-disable-next-line eqeqeq
      if (bust == 1) {
        return res.status(200).json(
          { message: 'busStop updated successfully.' }
        );
      }
      res.status(404).json(
        { status: 404, message: `Cannot update bustop with id = ${id}` }
      );
    })
    .catch(() => res.status(500).json(
      { status: 500, message: 'server error!' }
    ));
};

module.exports = {
  createBusStop,
  getAllBusStops,
  getAllBusStopsGeoJson,
  getBusStopById,
  updateBusStop,
  deleteBusStop,
};
