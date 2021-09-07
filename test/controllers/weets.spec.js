const supertest = require('supertest');
const axios = require('axios').default;

const app = require('../../app');
const { encode } = require('../../app/helpers/jwt');
const { create: createUser } = require('../factories/users');
const { createMany: createManyWeets } = require('../factories/weets');
const { expectedOutputTokenRequired, expectedOutputTokenInvalid } = require('../mocks/users');
const { expectedEmptyQuery } = require('../mocks/pagination');
const { expectedOutputGetWeets, expectedOutputWeetCreated, weet } = require('../mocks/weets');

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

describe('# Weets: Get all weets', () => {
  it('Test #1: Weets search is successful', async done => {
    const email = 'email@wolox.co';
    const limit = 10;
    await createUser({ email });
    await createManyWeets(15);
    const res = await request
      .get('/weets')
      .query({ offset: 0, limit })
      .set('Authorization', `Bearer ${encode({ id: 1, email })}`);

    const { message } = expectedOutputGetWeets;

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(message);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data).toHaveLength(limit);
    done();
  });

  it('Test #2: Offset required', async done => {
    const res = await request.get('/weets').query({ limit: 10 });

    const { internal_code, message } = expectedEmptyQuery;

    expect(res.status).toBe(400);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message[0].msg).toBe(message[0].msg);
    done();
  });

  it('Test #3: Limit required', async done => {
    const res = await request.get('/weets').query({ offset: 0 });

    const { internal_code, message } = expectedEmptyQuery;

    expect(res.status).toBe(400);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message[0].msg).toBe(message[1].msg);
    done();
  });

  it('Test #4: Token required', async done => {
    const res = await request.get('/weets').query({ offset: 0, limit: 10 });

    const { internal_code, message } = expectedOutputTokenRequired;

    expect(res.status).toBe(401);
    expect(res.body.message).toBe(message);
    expect(res.body.internal_code).toBe(internal_code);
    done();
  });
});
