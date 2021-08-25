const { healthCheck } = require('./controllers/healthCheck');
const { createUser, signIn } = require('./controllers/users');

const { validateSchema } = require('./middlewares/validationSchema');
const { createUserValidator, checkUserCredentials } = require('./middlewares/schemas/users');
const { validateUserByEmail } = require('./middlewares/database/users');
const { authUser } = require('./middlewares/auth/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateSchema([createUserValidator]), validateUserByEmail], createUser);
  app.post('/users/sessions', [validateSchema([checkUserCredentials]), authUser], signIn);
};
