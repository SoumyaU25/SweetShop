const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); 
const User = require('../model/User');
const Sweet = require('../model/Sweet');

let adminToken;
let sweetId;

beforeAll(async () => {
    // use a separate db name to avoid polluting dev db
    const uri = process.env.MONGO + '-test';
    await mongoose.connect(uri);

    // Create admin user
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      username: 'adminUser2',
      email: 'admin@example.com',
      password: 'secret12345',
      role: 'admin'
    })
    .expect(201);

  adminToken = res.body.token;
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('Sweet routes checks', () => {
  test('POST /api/sweets → create sweet', async () => {
    const res = await request(app)
      .post('/api/sweets/create')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Laddoo',
        category: 'Indian',
        description:'Very Sweet',
        price: 120,
        quantity: 50,
        imageUrl: 'https://picsum.photos/200'
      })
      .expect(201);

    sweetId = res.body._id;
    expect(res.body.name).toBe('Laddoo');
  });

  test('GET /api/sweets → list sweets', async () => {
    const res = await request(app).get('/api/sweets').expect(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('POST /api/sweets/:id/purchase → decrease quantity', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ amount: 1 })
      .expect(200);

    expect(res.body.sweet.quantity).toBe(49);
  });

  test('POST /api/sweets/:id/restock → increase quantity (admin)', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ amount: 10 })
      .expect(200);

    expect(res.body.sweet.quantity).toBe(59);
  });
});


