import request from 'supertest';
import app from '../index';

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true);
  });
});

describe('POST BusStop', () => {
  it('should create a new busStop', async () => {
    const res = await request(app)
      .post('/busstop')
      .send({
        busStopName: 2,
        currentLocation: 'Remera',
        bus_status: 'inactive'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('bus');
  });

  it('should get a single bus', async () => {
    const busId = 1;
    const res = await request(app).get(`/buses/${busId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('bus');
  });

  it('should get all buses', async () => {
    const res = await request(app).get('/buses');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('buses');
  });
});
