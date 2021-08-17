// Controllers
const { healthCheck } = require('./controllers/healthCheck');
const userController = require('./controllers/users');

// Check Schemas
const { createUserValidator } = require('./middlewares/schemas/users');
const { validationsFields } = require('./middlewares/validationFields');
const { validateUserByEmail } = require('./middlewares/database/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post(
    '/users',
    [createUserValidator, validationsFields, validateUserByEmail],
    userController.createUser
  );
};
