const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signUpAdmin, signIn, userList } = require('./controllers/users');
const { createWeet, getWeets } = require('./controllers/weets');
const { ratingWeets } = require('./controllers/ratings');

const { validateSchema } = require('./middlewares/validationSchema');
const { createUserValidator, checkUserCredentials } = require('./middlewares/schemas/users');
const { checkPagination } = require('./middlewares/schemas/pagination');
const { checkRating } = require('./middlewares/schemas/ratings');
const { validateUserByEmail } = require('./middlewares/database/users');
const { authUser } = require('./middlewares/auth/users');
const { validateToken, validateAdmin } = require('./middlewares/auth/token');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post(
    '/admin/users',
    [validateSchema([createUserValidator]), validateToken, validateAdmin],
    signUpAdmin
  );
  app.get('/users', [validateSchema([checkPagination]), validateToken], userList);
  app.post('/users', [validateSchema([createUserValidator]), validateUserByEmail], signUp);
  app.post('/users/sessions', [validateSchema([checkUserCredentials]), authUser], signIn);
  app.post('/weets', [validateToken], createWeet);
  app.get('/weets', [validateSchema([checkPagination]), validateToken], getWeets);
  app.post('/weets/:weetId/ratings', [validateSchema([checkRating]), validateToken], ratingWeets);
};
