const { badRequest, invalidCredentials } = require('../../errors');
const { USER_INVALID_CREDENTIAL } = require('../../constants/messages');
const { decrypt } = require('../../helpers/encrypt');
const { User } = require('../../models');
const logger = require('../../logger');

exports.authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }, raw: true });

    if (!user) return next(invalidCredentials(USER_INVALID_CREDENTIAL));

    const validPassword = await decrypt(password, user.password);

    if (!validPassword) return next(invalidCredentials(USER_INVALID_CREDENTIAL));

    req.user = user;

    return next();
  } catch (error) {
    logger.error(badRequest(error));
    return next(badRequest(error.message));
  }
};
