const bycrypt = require('bcryptjs');
const logger = require('../logger');
const { defaultError } = require('../errors');
const {
  common: {
    utils: { saltLength }
  }
} = require('../../config');

exports.encrypt = (value, salt = saltLength) => {
  try {
    return bycrypt.hash(value, Number(salt));
  } catch (error) {
    logger.error(error);
    throw defaultError('Encryption error');
  }
};

exports.decrypt = (value, hash) => {
  try {
    return bycrypt.compare(value, hash);
  } catch (error) {
    logger.error(error);
    throw defaultError('Decrypt error');
  }
};
