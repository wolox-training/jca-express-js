const supertest = require('supertest');
const axios = require('axios').default;

const app = require('../../app');
const { encode } = require('../../app/helpers/jwt');
const { create: createUser } = require('../factories/users');
const { expectedOutputTokenRequired, expectedOutputTokenInvalid } = require('../mocks/users');
const { expectedOutputWeetCreated, weet } = require('../mocks/weets');

const request = supertest(app);

jest.mock('axios');

describe('# Weets: Create weet', () => {
  it('Test #1: Weet created', async done => {
    axios.get.mockResolvedValue({ data: weet });

    const email = 'email@wolox.co';
    await createUser({ email });
    const res = await request.post('/weets').set('Authorization', `Bearer ${encode({ id: 1, email })}`);

    const { message } = expectedOutputWeetCreated;

    expect(res.status).toBe(201);
    expect(res.body.message).toBe(message);
    expect(res.body.data.content).toBe(weet);
    done();
  });

  it('Test #2: Token required', async done => {
    const res = await request.post('/weets');

    const { internal_code, message } = expectedOutputTokenRequired;

    expect(res.status).toBe(401);
    expect(res.body.message).toBe(message);
    expect(res.body.internal_code).toBe(internal_code);
    done();
  });

  it('Test #3: Token invalid', async done => {
    const res = await request.post('/weets').set('Authorization', 'Bearer token_invalid_123');

    const { internal_code, message } = expectedOutputTokenInvalid;

    expect(res.status).toBe(401);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message).toBe(message);
    done();
  });
});
