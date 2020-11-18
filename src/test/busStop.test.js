import request from 'supertest';
import app from '../index';
import { generateToken } from '../helper/generateAuthToken';

const token = generateToken(1, 'admin', 'gunner@gmail.com');

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

afterAll(async () => {
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

describe('BusStop Endpoints', () => {
  it('should create a new bus Stop', async () => {
    const res = await request(app)
      .post('/busstop')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        busStopName: 'Kabeza',
        coordinate: '1234547.456789',
        sector: 'gisozi',
        district: 'gasabo',
      });
    expect(res.statusCode).toEqual(201);
  });
  it('should return server error', async () => {
    const res = await request(app)
      .delete('/busstop/funga')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(500);
  });
});

describe('GET BusStops', () => {
  it('should get all busStops', async (done) => {
    const res = await request(app)
      .get('/busstop')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.status).toEqual(200);
    done();
  });
  it('should get all busStops in geojson format', async (done) => {
    const res = await request(app)
      .get('/allbusstop?type=geojson')
      .set('Accept', 'application/json');
    expect(res.status).toEqual(200);
    done();
  });
  it('should return malformed request (missing query)', async (done) => {
    const res = await request(app)
      .get('/allbusstop?type=geojs')
      .set('Accept', 'application/json');
    expect(res.status).toEqual(422);
    done();
  });
  it('should return server error', async () => {
    const res = await request(app)
      .delete('/busstop/funga')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(500);
  });
});

describe('GET BusStops', () => {
  it('should get a single bus Stop', async (done) => {
    const resp = await request(app)
      .get('/busstop')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    const busStopID = resp.body[0].id;
    const res = await request(app)
      .get(`/busstop/${busStopID}`)
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
    done();
  });
  it('should return bus stop not found', async () => {
    const res = await request(app)
      .get('/busstop/144')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(404);
  });
  it('should return server error', async () => {
    const res = await request(app)
      .get('/busstop/code')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(500);
  });
});
describe('UPDATE single BusStop', () => {
  it('should update a single Busstop', async (done) => {
    const resp = await request(app)
      .get('/busstop')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    const busStopID = resp.body[resp.body.length - 1].id;
    const res = await request(app).patch(`/busstop/${busStopID}`)
      .send({
        busStopName: 'Kinamba',
        coordinate: '1234566.456789',
        sector: 'gisozi',
        district: 'gasabo'
      })
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
    done();
  });
  it('should return server error', async () => {
    const res = await request(app)
      .delete('/busstop/funga')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(500);
  });
});
describe('DELETE single busstop', () => {
  it('should delete single busstop', async (done) => {
    const resp = await request(app)
      .get('/busstop')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    const busStopID = resp.body[0].id;
    const res = await request(app)
      .delete(`/busstop/${busStopID}`)
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
    done();
  });
  it('It should not delete busstop of invalid id', async (done) => {
    const busStopID = 100;
    const res = await request(app)
      .patch(`/busstop/${busStopID}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
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
      .delete('/busstop/funga')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(500);
  });
});

describe('Search busstop by its name', () => {
  it('Should search busstop and return all with Nya keyword', async (done) => {
    const res = await request(app)
      .get('/searchbusstop?bstop=Nya')
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(200);
    done();
  });
});
