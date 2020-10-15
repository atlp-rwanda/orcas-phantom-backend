import request from 'supertest';
import app from '../index';

describe('Sample Test', () => {
  it('should test that true === true', (done) => {
    expect(true).toBe(true);
    done();
  });
});

describe('GET Welcome message', () => {
  it('should get welcome message', async (done) => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('Welcome to gunners-phanthom backend site');
    done();
  });
});

describe('Wrong route', () => {
  it('should get Incorrect route message', async (done) => {
    const res = await request(app).get('/invalid routes');
    expect(res.body.status).toEqual(404);
    expect(res.body.message).toEqual('Incorrect route! try again');
    done();
  });
});

describe('POST', () => {
  const bs3 = {
    busStopName: 'Kagara',
    coordinate: '1234566.456709',
    sector: 'kanombe',
    district: 'Kicukiro'
  };
  const bs4 = {
    busStopName: 'St jose',
    coordinate: '1234506.459789',
    sector: 'kanombe',
    district: 'Kicukiro'
  };

  beforeEach(async () => {
    await request(app)
      .post('/busstop')
      .send(bs3);
    await request(app)
      .post('/busstop')
      .send(bs4);
  });
  it('should create a new route', async (done) => {
    const res = await request(app)
      .post('/routes')
      .send({
        name: 'Gatsata-Nyabugogo',
        origin: 1,
        destination: 2,
        busStops: [1, 2]
      });
    expect(res.status).toEqual(201);
    done();
  });
});

describe('GET Routes', () => {
  it('should get all routes', async (done) => {
    const res = await request(app).get('/routes');
    expect(res.status).toEqual(200);
    done();
  });
});

describe('GET single Route', () => {
  it('should get a single route', async (done) => {
    const resp = await request(app).get('/routes');
    const routeID = resp.body[0].id;
    const res = await request(app).get(`/routes/${routeID}`);
    expect(res.statusCode).toEqual(200);
    done();
  });

  it('should not retrieve a route of invalid id', async (done) => {
    const res = await request(app).get(`/routes/${1000}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Route Not found!');
    done();
  });
});

describe('UPDATE single Route', () => {
  it('should update a single route', async (done) => {
    const resp = await request(app).get('/routes');
    const routeID = resp.body[resp.body.length - 1].id;
    const res = await request(app).patch(`/routes/${routeID}`)
      .send({
        name: 'Gatsata-Nyabugogo',
        origin: 6,
        destination: 9,
        busStops: [7, 9]
      });
    expect(res.statusCode).toEqual(200);
    done();
  });
  it('It should not delete route on invalid id', async (done) => {
    const routeID = 100;
    const res = await request(app).patch(`/routes/${routeID}`)
      .send({
        name: 'Gatsata-Nyabugogo',
        origin: 6,
        destination: 9,
        busStops: [7, 9]
      });
    expect(res.statusCode).toEqual(404);
    done();
  });
});

describe('DELETE single Route', () => {
  it('should delete single route', async (done) => {
    const resp = await request(app).get('/routes');
    const routeID = resp.body[resp.body.length - 1].id;
    const res = await request(app).delete(`/routes/${routeID}`);
    expect(res.statusCode).toEqual(200);
    done();
  });

  it('It should not delete route on invalid id', async (done) => {
    const routeID = 88;
    const res = await request(app).delete(`/routes/${routeID}`);
    expect(res.statusCode).toEqual(404);
    done();
  });
});
