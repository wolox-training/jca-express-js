const logger = require('../../logger');
const { databaseError, duplicateValuesError } = require('../../errors');
const { User } = require('../../models');

exports.validateUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    logger.info(user);
    if (user) {
      next(duplicateValuesError('User already exist in database'));
      return;
    }

    next();
  } catch (error) {
    logger.error(databaseError(error));
    throw databaseError('Error trying to get a user by mail');
  }
};
