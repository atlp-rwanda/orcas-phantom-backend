import request from 'supertest';
import app from '../index';
import { generateToken } from '../helper/generateAuthToken';

const token = generateToken(1, 'admin', 'gunner@gmail.com');

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true);
  });
});

describe('Bus Endpoints', () => {
  it('should create a new bus', async () => {
    const res = await request(app)
      .post('/buses')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        routId: 1,
        bus_plate: 'RAE 245 C',
        currentLocation: '-55666, 5564647',
        bus_status: 'inactive'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('bus');
  });
  it('should not create a new bus when currentLocation is'
  + ' invalid', async () => {
    const res = await request(app)
      .post('/buses')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        routId: 1,
        bus_plate: 'RAE 245 C',
        currentLocation: '-dgg556665564647',
        bus_status: 'inactive'
      });
    expect(res.statusCode).toEqual(400);
  });
  it('should not create a new bus when longitude is'
  + ' invalid', async () => {
    const res = await request(app)
      .post('/buses')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        routId: 1,
        bus_plate: 'RAE 245 C',
        currentLocation: '-556665,d564647',
        bus_status: 'inactive'
      });
    expect(res.statusCode).toEqual(400);
  });
  it('should not create a new bus when currentLocation is'
  + ' invalid', async () => {
    const res = await request(app)
      .post('/buses')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        routId: 1,
        bus_plate: 'RAE 245 C',
        currentLocation: '-d556665,564647',
        bus_status: 'inactive'
      });
    expect(res.statusCode).toEqual(400);
  });
});
describe('Bus Endpoints', () => {
  it('should not create a bus with missing bus_plate', async () => {
    const res = await request(app)
      .post('/buses')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        routId: 1,
        currentLocation: '-55666, 5564647',
        bus_status: 'inactive'
      });
    expect(res.statusCode).toEqual(400);
  });
});

describe('Bus Endpoints', () => {
  it('should get a single bus', async () => {
    const busId = 1;
    const res = await request(app)
      .get(`/buses/${busId}`)
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('bus');
  });
});

describe('Bus Endpoints', () => {
  it('should get all buses', async () => {
    const res = await request(app)
      .get('/buses')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('buses');
  });
});

describe('Bus Endpoints', () => {
  it('should update a bus', async () => {
    const res = await request(app)
      .patch('/buses/2')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        routId: 2,
        bus_plate: 'RAE 245 C',
        currentLocation: '-55.666, 55.64647',
        bus_status: 'inactive'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('bus');
  });
  it('should not update a bus when current location is invalid', async () => {
    const res = await request(app)
      .patch('/buses/2')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        routId: 2,
        bus_plate: 'RAE 245 C',
        currentLocation: '-55.66655.64647',
        bus_status: 'inactive'
      });
    expect(res.statusCode).toEqual(400);
  });
  it('should not update a bus when latitude is invalid', async () => {
    const res = await request(app)
      .patch('/buses/2')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        routId: 2,
        bus_plate: 'RAE 245 C',
        currentLocation: '-b55.666,55.64647',
        bus_status: 'inactive'
      });
    expect(res.statusCode).toEqual(400);
  });
  it('should not update a bus when longitude is invalid', async () => {
    const res = await request(app)
      .patch('/buses/2')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        routId: 2,
        bus_plate: 'RAE 245 C',
        currentLocation: '-55.666,b55.64647',
        bus_status: 'inactive'
      });
    expect(res.statusCode).toEqual(400);
  });
});

describe('Bus Endpoints', () => {
  it('should not update a bus with ID which is not available', async () => {
    const res = await request(app)
      .patch('/buses/144')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        routId: 144,
        bus_plate: 'RAE 245 C',
        currentLocation: '-55.666, 55.64647',
        bus_status: 'inactive'
      });
    expect(res.statusCode).toEqual(404);
  });
});

describe('Bus Endpoints', () => {
  it('should not update a bus with invalid ID', async () => {
    const res = await request(app)
      .patch('/buses/a')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        routId: 1,
        bus_plate: 'RAE 245 C',
        currentLocation: '-55666, 5564647',
        bus_status: 'inactive'
      });
    expect(res.statusCode).toEqual(500);
  });
});

describe('Bus Endpoints', () => {
  it('should delete a bus', async () => {
    const res = await request(app)
      .delete('/buses/1')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
  });
});

describe('Bus Endpoints', () => {
  it('should respond with status code 404 if resource is not found',
    async (done) => {
      const busId = 1;
      const res = await request(app)
        .get(`/buses/${busId}`)
        .set('Accept', 'application/json')
        .set('Authorization', token);
      expect(res.statusCode).toEqual(404);
      done();
    });
});
