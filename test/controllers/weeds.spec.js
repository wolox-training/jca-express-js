const supertest = require('supertest');
const app = require('../../app');
const { encode } = require('../../app/helpers/jwt');
const { create: createUser } = require('../factories/users');
const { expectedOutputTokenRequired, expectedOutputTokenInvalid } = require('../mocks/users');
const { expectedOutputWeedCreated } = require('../mocks/weeds');

const request = supertest(app);

describe('# Weeds: Create weed', () => {
  it('Test #1: Weed created', async done => {
    const email = 'email@wolox.co';
    await createUser({ email });
    const res = await request.post('/weeds').set('Authorization', `Bearer ${encode({ id: 1, email })}`);

    const { message } = expectedOutputWeedCreated;

    expect(res.status).toBe(201);
    expect(res.body.message).toBe(message);
    expect(res.body.data).toHaveProperty('content');
    done();
  });

  it('Test #2: Token required', async done => {
    const res = await request.post('/weeds');

    const { internal_code, message } = expectedOutputTokenRequired;

    expect(res.status).toBe(401);
    expect(res.body.message).toBe(message);
    expect(res.body.internal_code).toBe(internal_code);
    done();
  });

  it('Test #3: Token invalid', async done => {
    const res = await request.post('/weeds').set('Authorization', 'Bearer token_invalid_123');

    const { internal_code, message } = expectedOutputTokenInvalid;

    expect(res.status).toBe(401);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message).toBe(message);
    done();
  });
});
