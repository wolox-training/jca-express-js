const bycrypt = require('bcryptjs');
const logger = require('../logger');
const { defaultError } = require('../errors');

exports.encrypt = value => {
  try {
    return bycrypt.hash(value);
  } catch (error) {
    logger.error(error);
    throw defaultError('Encryption error');
  }
};
