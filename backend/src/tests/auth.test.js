const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');

describe('Auth Register', () => {
  beforeAll(async () => {
    // use a separate db name to avoid polluting dev db
    const uri = process.env.MONGO_URI + '-test';
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it('should register a new user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'alice',
        email: 'alice@example.com',
        password: 'password123'
      })
      .expect(201);

    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('alice@example.com');

    const user = await User.findOne({ email: 'alice@example.com' });
    expect(user).not.toBeNull();
  });

  it('should fail if email already exists', async () => {
    await User.create({ username: 'bob', email: 'bob@example.com', password: 'hashed' });
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'bob2',
        email: 'bob@example.com',
        password: 'password123'
      })
      .expect(400);

    expect(res.body.message).toMatch(/email/i);
  });
});
