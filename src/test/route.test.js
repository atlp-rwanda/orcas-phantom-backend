import request from 'supertest';
import app from '../index';
import generateToken from '../helper/generateAuthToken';

const token = generateToken(1, 'admin', 'gunner@gmail.com');

describe('GET Welcome message', () => {
  it('should get welcome message', async (done) => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual(
      'Welcome to gunners-phanthom backend site'
    );
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
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(bs3);
    await request(app)
      .post('/busstop')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(bs4);
  });
  it('should create a new route', async (done) => {
    const resp = await request(app)
      .get('/busstop')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    const id1 = resp.body[0].id;
    const id2 = resp.body[1].id;
    const res = await request(app)
      .post('/routes')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        name: 'Gatsata-Nyabugogo',
        origin: id1,
        destination: id2,
        busStops: [id1, id2]
      });
    expect(res.status).toEqual(201);
    done();
  });
});

describe('GET Routes', () => {
  it('should get all routes', async (done) => {
    const res = await request(app)
      .get('/routes')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.status).toEqual(200);
    done();
  });
});

describe('GET single Route', () => {
  it('should get a single route', async (done) => {
    const resp = await request(app)
      .get('/routes')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    const routeID = resp.body[0].id;
    const res = await request(app)
      .get(`/routes/${routeID}`)
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
    done();
  });

  it('should not retrieve a route of invalid id', async (done) => {
    const res = await request(app)
      .get(`/routes/${1000}`)
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Route Not found!');
    done();
  });
});

describe('UPDATE single Route', () => {
  it('should update a single route', async (done) => {
    const resp = await request(app)
      .get('/routes')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    const routeID = resp.body[resp.body.length - 1].id;
    const res = await request(app)
      .patch(`/routes/${routeID}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
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
    const res = await request(app)
      .patch(`/routes/${routeID}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
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
    const resp = await request(app)
      .get('/routes')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    const routeID = resp.body[resp.body.length - 1].id;
    const res = await request(app)
      .delete(`/routes/${routeID}`)
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
    done();
  });

  it('It should not delete route on invalid id', async (done) => {
    const routeID = 88;
    const res = await request(app)
      .delete(`/routes/${routeID}`)
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(404);
    done();
  });
});
