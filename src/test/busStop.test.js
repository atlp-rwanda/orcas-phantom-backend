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
        busStopName: Kinamba,
        coordinate: 1345678.456738,
        sector: Gisozi,
        district: Gasabo
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('busstop');
  });

  it('should get a single busstop', async () => {
    const busStopId = 1;
    const res = await request(app).get(`/busstop/${busStopId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('bus');
  });

  it('should get all busStops', async () => {
    const res = await request(app).get('/busstop');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('busstop');
  });
});
