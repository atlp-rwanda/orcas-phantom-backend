import request from 'supertest';
import app from '../index';
import db from '../database/connection';

beforeAll(async () => {
  await db.sync();
});

afterAll(() => {
  db.close();
});

describe('Test the welcome API', () => {
  test('It should return Welcome to orcas-phanthom backend site', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test the users API', () => {
  test('It should return all users', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test the users API', () => {
  test('It should return one user', async () => {
    const response = await request(app).get('/user/1');
    expect(response.statusCode).toBe(200);
  });
});

describe('Creating users API', () => {
  const user = {
    email: 'hn@gmail.com',
    password: '123456',
    role: 'admin',
    busId: '2525'
  };

  test('It should return User created successfully', async () => {
    const response = await request(app)
      .post('/signup')
      .send(user);
    expect(response.statusCode).toBe(200);
  });
});

describe('Updating users API', () => {
  const user = {
    email: 'hn@gmail.com',
    password: '123456',
    role: 'admin',
    busId: '2525'
  };

  test('It should return User created updated', async () => {
    const response = await request(app)
      .patch('/user/2')
      .send(user);
    expect(response.statusCode).toBe(200);
  });
});

describe('Deleting users API', () => {
  test('It should return User was deleted successfully.', async () => {
    const response = await request(app).delete('/user/2');
    expect(response.statusCode).toBe(200);
  });
});
