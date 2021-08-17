const User = require('../models/user');
const logger = require('../logger');
const { databaseError } = require('../errors');

exports.createUser = user => {
  try {
    return User.create(user);
  } catch (error) {
    logger.error(error);
    throw databaseError('User can not be created in database');
  }
};
