const { healthCheck } = require('./controllers/healthCheck');
const { createUser, signIn, userList } = require('./controllers/users');

const { validateSchema } = require('./middlewares/validationSchema');
const { createUserValidator, checkUserCredentials } = require('./middlewares/schemas/users');
const { checkPagination } = require('./middlewares/schemas/pagination');
const { validateUserByEmail } = require('./middlewares/database/users');
const { authUser } = require('./middlewares/auth/users');
const { validateToken } = require('./middlewares/auth/token');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', [validateSchema([checkPagination]), validateToken], userList);
  app.post('/users', [validateSchema([createUserValidator]), validateUserByEmail], createUser);
  app.post('/users/sessions', [validateSchema([checkUserCredentials]), authUser], signIn);
};
