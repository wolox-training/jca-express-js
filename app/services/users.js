const { User } = require('../models');
const logger = require('../logger');
const { databaseError } = require('../errors');
const { CEO, DEVELOPER, EM, HEAD, LEAD, TL } = require('../constants/positions');

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

exports.upsertUser = user => {
  try {
    return User.upsert(user);
  } catch (error) {
    logger.error(error);
    throw databaseError('Error creating/updating admin user');
  }
};

exports.getPosition = score => {
  if (score <= 5) return DEVELOPER;
  else if (score <= 9) return LEAD;
  else if (score <= 19) return TL;
  else if (score <= 29) return EM;
  else if (score <= 49) return HEAD;
  else if (score >= 50) return CEO;
  return null;
};

exports.updatePosition = ({ position, id }, transaction) => {
  try {
    return User.update({ position }, { where: { id } }, { transaction });
  } catch (error) {
    logger.error(error);
    throw databaseError('Error updating user position');
  }
};
