const supertest = require('supertest');
const { errorsSchema } = require('../mocks/ratings');
const { expectedOutputTokenRequired, expectedOutputTokenInvalid } = require('../mocks/users');
const { encode } = require('../../app/helpers/jwt');

const { create: createUser } = require('../factories/users');
const { create: createWeet } = require('../factories/weets');

const app = require('../../app');

const request = supertest(app);

describe('# Rating', () => {
  it('Test #1: Rating of the successful weet', async done => {
    const email = 'john.doe@gmail.com';
    await createUser({ email });
    await createWeet();

    const res = await request
      .post('/weets/1/ratings')
      .send({ score: true })
      .set('Authorization', `Bearer ${encode({ id: 1, email })}`);

    expect(res.status).toBe(201);
    done();
  });

  it('Test #2: Weet parameter must be numeric', async done => {
    const res = await request.post('/weets/string/ratings').send();

    const { internal_code, message } = errorsSchema;

    expect(res.status).toBe(400);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message[0].msg).toBe(message[1].msg);
    done();
  });

  it('Test #3: Weet does not exist', async done => {
    const res = await request.post('/weets/1/ratings').send();

    const { internal_code, message } = errorsSchema;

    expect(res.status).toBe(400);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message[0].msg).toBe(message[0].msg);
    done();
  });

  it('Test #4: Empty score', async done => {
    await createUser({ email: 'john.doe@gmail.com' });
    await createWeet();

    const res = await request.post('/weets/1/ratings').send({ score: '' });

    const { internal_code, message } = errorsSchema;

    expect(res.status).toBe(400);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message[0].msg).toBe(message[2].msg);
    done();
  });

  it('Test #5: Score should be exist', async done => {
    await createUser({ email: 'john.doe@gmail.com' });
    await createWeet();

    const res = await request.post('/weets/1/ratings').send();

    const { internal_code, message } = errorsSchema;

    expect(res.status).toBe(400);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message[0].msg).toBe(message[3].msg);
    done();
  });

  it('Test #6: Score should be boolean', async done => {
    await createUser({ email: 'john.doe@gmail.com' });
    await createWeet();

    const res = await request.post('/weets/1/ratings').send({ score: 'string' });

    const { internal_code, message } = errorsSchema;

    expect(res.status).toBe(400);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message[0].msg).toBe(message[4].msg);
    done();
  });

  it('Test #7: Token Required', async done => {
    await createUser({ email: 'john.doe@gmail.com' });
    await createWeet();
    const res = await request.post('/weets/1/ratings').send({ score: true });

    const { internal_code, message } = expectedOutputTokenRequired;

    expect(res.status).toBe(401);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message).toBe(message);
    done();
  });

  it('Test #8: Token Invalid', async done => {
    await createUser({ email: 'john.doe@gmail.com' });
    await createWeet();

    const res = await request
      .post('/weets/1/ratings')
      .send({ score: true })
      .set('Authorization', 'Bearer invalid_token');

    const { internal_code, message } = expectedOutputTokenInvalid;

    expect(res.status).toBe(401);
    expect(res.body.internal_code).toBe(internal_code);
    expect(res.body.message).toBe(message);
    done();
  });
});
