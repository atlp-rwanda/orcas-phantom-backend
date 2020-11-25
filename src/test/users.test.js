import request from 'supertest';
import app from '../index';
import generateToken from '../helper/generateAuthToken';

const token = generateToken(1, 'admin', 'gunner@gmail.com');

const invalidToken = '';

describe('Login a user', () => {
  it('should return No associated account with this email', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'hn@gmail.com',
        password: '123456'
      });
    expect(res.statusCode).toEqual(404);
  });
  it('should return Incorrect password!', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'gunner@gmail.com',
        password: '123456'
      });
    expect(res.statusCode).toEqual(404);
  });
  it('should return login successfully', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'gunner@gmail.com',
        password: '111111'
      });
    expect(res.statusCode).toEqual(200);
  });
});

describe('Get all users', () => {
  it('should return all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
  });
  it('should return Header Not Set', async () => {
    const res = await request(app)
      .get('/api/users');
    expect(res.statusCode).toEqual(401);
  });
  it('should return Unauthorised or Invalid Token', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', invalidToken);
    expect(res.statusCode).toEqual(401);
  });
});
describe('User Post Endpoints', () => {
  it('should return signup a new user', async () => {
    const res = await request(app)
      .post('/api/signup')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        email: 'hn@gmail.com',
        password: '123456',
        role: 'admin',
        busId: 2
      });
    expect(res.statusCode).toEqual(201);
  });
  it('should return signup a new user', async () => {
    const res = await request(app)
      .post('/api/signup')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        email: 'habimana@gmail.com',
        password: '123456',
        role: 'admin',
        busId: 1
      });
    expect(res.statusCode).toEqual(201);
  });
});

describe('Get all users', () => {
  it('should return all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
  });
});
describe('Get user by id', () => {
  it('should return a user', async () => {
    const res = await request(app)
      .get('/api/users/2')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
  });
  it('should return user not found', async () => {
    const res = await request(app)
      .get('/api/users/144')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(404);
  });
  it('should return server error', async () => {
    const res = await request(app)
      .get('/api/users/hh')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(500);
  });
});
describe('Updating users API', () => {
  it('should return Updating a user', async () => {
    const res = await request(app)
      .patch('/api/users/2')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        email: 'fils@gmail.com',
        password: '123456',
        role: 'admin',
        busId: 1
      });
    expect(res.statusCode).toEqual(200);
  });
  it('should return Role must be either admin or bus', async () => {
    const res = await request(app)
      .patch('/api/users/2')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        email: 'jules@gmail.com',
        password: '123456',
        role: 'man',
        busId: 1
      });
    expect(res.statusCode).toEqual(400);
  });
});
describe('Delete a user by id', () => {
  it('should return delete a user', async () => {
    const res = await request(app)
      .delete('/api/users/2')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
  });
  it('should return user not found', async () => {
    const res = await request(app)
      .delete('/api/users/144')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(404);
  });
  it('should return server error', async () => {
    const res = await request(app)
      .delete('/api/users/hh')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(500);
  });
});
