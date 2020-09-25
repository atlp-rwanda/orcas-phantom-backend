import request from 'supertest';
import app from '../index';

describe('Test the welcome API', () => {
  test('It should return Welcome to orcas-phanthom backend site', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
