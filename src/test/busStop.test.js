import request from 'supertest';
import app from '../index';

describe('BusStop Endpoints', () => {
  it('should create a new bus Stop', async () => {
    const res = await request(app)
      .post('/busstop')
      .send({
        busStopName: 'Kinamba',
        coordinate: '1234566.456789',
        sector: 'gisozi',
        district: 'gasabo',
      });
    expect(res.statusCode).toEqual(201);
  });
  it('should return server error', async () => {
    const res = await request(app)
      .delete('/busstop/funga');
    expect(res.statusCode).toEqual(500);
  });
});

describe('GET BusStops', () => {
  it('should get all busStops', async (done) => {
    const res = await request(app).get('/busstop');
    expect(res.status).toEqual(200);
    done();
  });
  it('should return server error', async () => {
    const res = await request(app)
      .delete('/busstop/funga');
    expect(res.statusCode).toEqual(500);
  });
});

describe('GET BusStops', () => {
  it('should get a single bus Stop', async (done) => {
    const resp = await request(app).get('/busstop');
    const busStopID = resp.body[0].id;
    const res = await request(app).get(`/busstop/${busStopID}`);
    expect(res.statusCode).toEqual(200);
    done();
  });
  it('should return bus stop not found', async () => {
    const res = await request(app)
      .get('/busstop/144');
    expect(res.statusCode).toEqual(404);
  });
  it('should return server error', async () => {
    const res = await request(app)
      .get('/busstop/code');
    expect(res.statusCode).toEqual(500);
  });
});
describe('UPDATE single BusStop', () => {
  it('should update a single Busstop', async (done) => {
    const resp = await request(app).get('/busstop');
    const busStopID = resp.body[resp.body.length - 1].id;
    const res = await request(app).patch(`/busstop/${busStopID}`)
      .send({
        busStopName: 'Kinamba',
        coordinate: '1234566.456789',
        sector: 'gisozi',
        district: 'gasabo'
      });
    expect(res.statusCode).toEqual(200);
    done();
  });
  it('should return server error', async () => {
    const res = await request(app)
      .delete('/busstop/funga');
    expect(res.statusCode).toEqual(500);
  });
});
describe('DELETE single busstop', () => {
  it('should delete single busstop', async (done) => {
    const resp = await request(app).get('/busstop');
    const busStopID = resp.body[resp.body.length - 1].id;
    const res = await request(app).delete(`/busstop/${busStopID}`);
    expect(res.statusCode).toEqual(200);
    done();
  });
  it('It should not delete busstop of invalid id', async (done) => {
    const busStopID = 100;
    const res = await request(app).patch(`/busstop/${busStopID}`)
      .send({
        busStopName: 'Kinamba',
        coordinate: '1234566.456789',
        sector: 'gisozi',
        district: 'gasabo'
      });
    expect(res.statusCode).toEqual(404);
    done();
  });
  it('should return server error', async () => {
    const res = await request(app)
      .delete('/busstop/funga');
    expect(res.statusCode).toEqual(500);
  });
});
