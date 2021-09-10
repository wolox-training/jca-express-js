const logger = require('../logger');
const { databaseError } = require('../errors');
const { Token } = require('../models');

exports.saveToken = values => {
  try {
    return Token.create(values);
  } catch (error) {
    logger.error(error);
    throw databaseError('The token could not be created');
  }
};

exports.destroyTokensByUser = userId => {
  try {
    return Token.destroy({ where: { userId } });
  } catch (error) {
    logger.error(error);
    throw databaseError('Sessions could not be invalidated');
  }
};
