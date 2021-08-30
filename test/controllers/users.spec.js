const supertest = require('supertest');
const app = require('../../app');
const {
  expectedInput,
  expectedOutput,
  expectedOutputEmailDuplicate,
  expectedOutputInvalidPass,
  expectedOutputEmptyBody,
  expectedOutputEmptyBodyAuth,
  expectedOutputInvalidDomain,
  expectedOutputErrorCredentials,
  encryptedPassword,
  expectedEmptyQueryGetUser,
  expectedOutputTokenRequired,
  expectedOutputTokenInvalid
} = require('../mocks/users');
const { encode } = require('../../app/helpers/jwt');
const { GET_LIST_USERS_SUCCESS } = require('../../app/constants/messages');
const { create: createUser, createMany } = require('../factories/users');

const request = supertest(app);

describe('# User: Sign Up', () => {
  it('Test #1: User created successfully', async done => {
    const res = await request.post('/users').send(expectedInput);

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe(expectedOutput.data.name);
    expect(res.body.message).toBe(expectedOutput.message);
    done();
  });

  it('Test #2: User with an email already in use', async done => {
    await createUser({ email: expectedInput.email });
    const res = await request.post('/users').send(expectedInput);

    const { internal_code, message } = expectedOutputEmailDuplicate;

    expect(res.status).toBe(409);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message).toBe(message);
    done();
  });

  it('Test #3: Invalid password', async done => {
    const res = await request.post('/users').send({ ...expectedInput, password: '1234567' });

    const { internal_code, message } = expectedOutputInvalidPass;

    expect(res.status).toBe(400);
    expect(res.body.message[0].msg).toBe(message[0].msg);
    expect(res.body.internal_code).toBe(internal_code);
    done();
  });

  it('Test #4: Empty Body', async done => {
    const res = await request.post('/users').send({});

    const { internal_code, message } = expectedOutputEmptyBody;

    expect(res.status).toBe(400);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message).toEqual(expect.arrayContaining(message));
    done();
  });

  it('Test #5: Invalid domain email', async done => {
    const res = await request.post('/users').send({ ...expectedInput, email: 'john.doe@gmail.com' });

    const { internal_code, message } = expectedOutputInvalidDomain;

    expect(res.status).toBe(400);
    expect(res.body.message[0].msg).toBe(message[0].msg);
    expect(res.body.internal_code).toBe(internal_code);
    done();
  });
});

describe('# User: Sign In', () => {
  it('Test #1: Token generated', async done => {
    const password = await encryptedPassword(expectedInput.password);
    await createUser({ email: expectedInput.email, password });
    const res = await request
      .post('/users/sessions')
      .send({ email: expectedInput.email, password: expectedInput.password });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    done();
  });

  it('Test #2: Invalid domain email', async done => {
    const res = await request
      .post('/users/sessions')
      .send({ email: 'john.doe@gmail.com', password: expectedInput.password });

    const { internal_code, message } = expectedOutputInvalidDomain;

    expect(res.status).toBe(400);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message[0].msg).toBe(message[0].msg);
    done();
  });

  it('Test #3: Empty Body', async done => {
    const res = await request.post('/users/sessions').send({});

    const { internal_code, message } = expectedOutputEmptyBodyAuth;

    expect(res.status).toBe(400);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message).toEqual(expect.arrayContaining(message));
    done();
  });

  it('Test #4: Invalid Credentials', async done => {
    const res = await request
      .post('/users/sessions')
      .send({ email: expectedInput.email, password: 'badpassword' });

    const { internal_code, message } = expectedOutputErrorCredentials;

    expect(res.status).toBe(403);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message).toBe(message);
    done();
  });
});

describe('# User: Get Users', () => {
  it('Test #1: Empty Query Params', async done => {
    const res = await request.get('/users');

    const { internal_code, message } = expectedEmptyQueryGetUser;

    expect(res.status).toBe(400);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message).toEqual(expect.arrayContaining(message));
    done();
  });

  it('Test #2: Offset is required', async done => {
    const res = await request.get('/users').query({ limit: 10 });

    const { internal_code, message } = expectedEmptyQueryGetUser;

    expect(res.status).toBe(400);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message[0].msg).toBe(message[0].msg);
    done();
  });

  it('Test #3: Limit is required', async done => {
    const res = await request.get('/users').query({ offset: 0 });

    const { internal_code, message } = expectedEmptyQueryGetUser;

    expect(res.status).toBe(400);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message[0].msg).toBe(message[1].msg);
    done();
  });

  it('Test #4: Token required', async done => {
    const res = await request.get('/users').query({ offset: 0, limit: 10 });

    const { internal_code, message } = expectedOutputTokenRequired;

    expect(res.status).toBe(401);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message).toBe(message);
    done();
  });

  it('Test #5: Token invalid', async done => {
    const res = await request
      .get('/users')
      .query({ offset: 0, limit: 10 })
      .set('Authorization', 'Bearer token_invalid_123');

    const { internal_code, message } = expectedOutputTokenInvalid;

    expect(res.status).toBe(401);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message).toBe(message);
    done();
  });

  it('Test #6: Get list successfully', async done => {
    await createMany(15);
    const limit = 10;
    const res = await request
      .get('/users')
      .query({ offset: 0, limit })
      .set('Authorization', `Bearer ${encode({ userId: 1, email: 'email@wolox.co' })}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(GET_LIST_USERS_SUCCESS);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data).toHaveLength(limit);
    done();
  });
});
