const supertest = require('supertest');
const app = require('../../app');
const {
  expectedInput,
  expectedOutput,
  expectedOutputEmailDuplicate,
  expectedOutputInvalidPass,
  expectedOutputEmptyBody,
  expectedOutputInvalidDomain
} = require('../mocks/users');
const { EXIST } = require('../../app/constants/validations');

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
    await request.post('/users').send(expectedInput);
    const secondRequest = await request.post('/users').send(expectedInput);

    const { internal_code, message } = expectedOutputEmailDuplicate;

    expect(secondRequest.status).toBe(409);
    expect(secondRequest.body.internal_code).toBe(internal_code);
    expect(secondRequest.body.message).toBe(message);
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

    const requiredItems = res.body.message.filter(({ msg }) => msg.includes(EXIST));

    expect(res.status).toBe(400);
    expect(res.body.internal_code).toBe(internal_code);
    expect(requiredItems).toStrictEqual(message);
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
