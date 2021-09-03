const supertest = require('supertest');
const app = require('../../app');
const { encode } = require('../../app/helpers/jwt');
const { create: createUser } = require('../factories/users');
const { createMany: createManyWeeds } = require('../factories/weets');
const { expectedOutputTokenRequired, expectedOutputTokenInvalid } = require('../mocks/users');
const { expectedEmptyQuery } = require('../mocks/pagination');
const { expectedOutputWeedCreated, expectedOutputGetWeeds } = require('../mocks/weeds');

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

describe('# Weeds: Get all weeds', () => {
  it('Test #1: Weeds search is successful', async done => {
    const email = 'email@wolox.co';
    const limit = 10;
    await createUser({ email });
    await createManyWeeds(15);
    const res = await request
      .get('/weeds')
      .query({ offset: 0, limit })
      .set('Authorization', `Bearer ${encode({ id: 1, email })}`);

    const { message } = expectedOutputGetWeeds;

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(message);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data).toHaveLength(limit);
    done();
  });

  it('Test #2: Offset required', async done => {
    const res = await request.get('/weeds').query({ limit: 10 });

    const { internal_code, message } = expectedEmptyQuery;

    expect(res.status).toBe(400);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message[0].msg).toBe(message[0].msg);
    done();
  });

  it('Test #3: Limit required', async done => {
    const res = await request.get('/weeds').query({ offset: 0 });

    const { internal_code, message } = expectedEmptyQuery;

    expect(res.status).toBe(400);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message[0].msg).toBe(message[1].msg);
    done();
  });

  it('Test #4: Token required', async done => {
    const res = await request.get('/weeds').query({ offset: 0, limit: 10 });

    const { internal_code, message } = expectedOutputTokenRequired;

    expect(res.status).toBe(401);
    expect(res.body.message).toBe(message);
    expect(res.body.internal_code).toBe(internal_code);
    done();
  });
});
