const logger = require('../../logger');
const { USER_EXIST } = require('../../constants/messages');
const { databaseError, duplicateValuesError } = require('../../errors');
const { User } = require('../../models');

exports.validateUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    logger.info(user);
    if (user) return next(duplicateValuesError(USER_EXIST));

    return next();
  } catch (error) {
    logger.error(databaseError(error));
    throw databaseError('Error trying to get a user by mail');
  }
};
