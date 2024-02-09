const supertest = require('supertest');
const app = require('../server'); 

describe('API Tests', () => {
  describe('GET /api/pizzas', () => {
    it('should get all pizzas', async () => {
      const response = await supertest(app).get('/api/pizzas');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/toppings', () => {
    it('should get all toppings', async () => {
      const response = await supertest(app).get('/api/toppings');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});