import request from 'supertest';
import app from '../index';

describe('Get all users', () => {
  it('should return no users', async () => {
    const res = await request(app)
      .get('/api/users');
    expect(res.statusCode).toEqual(404);
  });
});
describe('User Post Endpoints', () => {
  it('should return signup a new user', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({
        email: 'hn@gmail.com',
        password: '123456',
        role: 'admin',
        busId: '2525'
      });
    expect(res.statusCode).toEqual(201);
  });
  it('should return signup a new user', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({
        email: 'habimana@gmail.com',
        password: '123456',
        role: 'admin',
        busId: '2525'
      });
    expect(res.statusCode).toEqual(201);
  });
});

describe('Get all users', () => {
  it('should return all users', async () => {
    const res = await request(app)
      .get('/api/users');
    expect(res.statusCode).toEqual(200);
  });
});
describe('Get user by id', () => {
  it('should return a user', async () => {
    const res = await request(app)
      .get('/api/user/2');
    expect(res.statusCode).toEqual(200);
  });
  it('should return user not found', async () => {
    const res = await request(app)
      .get('/api/user/144');
    expect(res.statusCode).toEqual(404);
  });
  it('should return server error', async () => {
    const res = await request(app)
      .get('/api/user/hh');
    expect(res.statusCode).toEqual(500);
  });
});
describe('Updating users API', () => {
  it('should return Updating a user', async () => {
    const res = await request(app)
      .patch('/api/user/2')
      .send({
        email: 'fils@gmail.com',
        password: '123456',
        role: 'admin',
        busId: '2525'
      });
    expect(res.statusCode).toEqual(200);
  });
  it('should return Role must be either admin or bus', async () => {
    const res = await request(app)
      .patch('/api/user/2')
      .send({
        email: 'jules@gmail.com',
        password: '123456',
        role: 'man',
        busId: '2525'
      });
    expect(res.statusCode).toEqual(400);
  });
});
describe('Delete a user by id', () => {
  it('should return delete a user', async () => {
    const res = await request(app)
      .delete('/api/user/2');
    expect(res.statusCode).toEqual(200);
  });
  it('should return user not found', async () => {
    const res = await request(app)
      .delete('/api/user/144');
    expect(res.statusCode).toEqual(404);
  });
  it('should return server error', async () => {
    const res = await request(app)
      .delete('/api/user/hh');
    expect(res.statusCode).toEqual(500);
  });
});
