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
      .set('Accept', 'application/json')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiZmlzdG9uQGdtYWlsLmNvbSIsImlhdCI6MTYwMjIxMDQwNCwiZXhwIjoxNjAyMjk2ODA0fQ.S3GtYySKfBNIrw0DyN3htsRLydvVAPZBCMgsUZp3I5Y')
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
      .set('Accept', 'application/json')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiZmlzdG9uQGdtYWlsLmNvbSIsImlhdCI6MTYwMjIxMDQwNCwiZXhwIjoxNjAyMjk2ODA0fQ.S3GtYySKfBNIrw0DyN3htsRLydvVAPZBCMgsUZp3I5Y')
      .send({
        email: 'habimana@gmail.com',
        password: '123456',
        role: 'admin',
        busId: '2525'
      });
    expect(res.statusCode).toEqual(201);
  });
  it('should return Invalid Token', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({
        email: 'habimana@gmail.com',
        password: '123456',
        role: 'admin',
        busId: '2525'
      });
    expect(res.statusCode).toEqual(401);
  });
  it('should return Access denied! you are not an admin', async () => {
    const res = await request(app)
      .post('/api/signup')
      .set('Accept', 'application/json')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInJvbGUiOiJidXMiLCJlbWFpbCI6Im1vbmVoaW5AZ21haWwuY29tIiwiaWF0IjoxNjAyMjEwODgxLCJleHAiOjE2MDIyOTcyODF9.9B4EkRmYaXUo0unyPaYJimteFNVmol9oOlzTRMyHo2M')
      .send({
        email: 'habimana@gmail.com',
        password: '123456',
        role: 'admin',
        busId: '2525'
      });
    expect(res.statusCode).toEqual(401);
  });
});

describe('Login user', () => {
  it('should return Login successful', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'habimana@gmail.com',
        password: '123456'
      });
    expect(res.statusCode).toEqual(200);
  });
  it('should return No associated account with this email!', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'martin@gmail.com',
        password: '123456'
      });
    expect(res.statusCode).toEqual(404);
  });
  it('should return Incorrect password', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'habimana@gmail.com',
        password: 'dddddd'
      });
    expect(res.statusCode).toEqual(404);
  });
  it('should return email must be a valid email', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'habimanagmail.com',
        password: 'dddddd'
      });
    expect(res.statusCode).toEqual(400);
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
  it('should return user successful updated', async () => {
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
