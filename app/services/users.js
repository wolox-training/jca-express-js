const { User } = require('../models');
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

exports.getUsers = ({ offset, limit }) => {
  try {
    return User.findAll({ offset, limit, attributes: { exclude: ['password'] }, raw: true });
  } catch (error) {
    logger.error(error);
    throw databaseError('List of users could not be consulted');
  }
};
