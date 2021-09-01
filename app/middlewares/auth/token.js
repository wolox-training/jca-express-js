const logger = require('../../logger');
const { TOKEN_INVALID, TOKEN_REQUIRED, UNAUTHORIZED_USER } = require('../../constants/messages');
const { ADMIN } = require('../../constants/roles');
const { invalidToken, unauthenticated } = require('../../errors');
const { decoded } = require('../../helpers/jwt');
const { User } = require('../../models');

exports.validateToken = (req, res, next) => {
  try {
    const authorization = req.header('authorization');

    if (!authorization) return next(invalidToken(TOKEN_REQUIRED));

    const [, token] = authorization.split(' ');

    const user = decoded(token);

    logger.info(`${user.email} authenticated successfully`);

    req.user = user;

    return next();
  } catch (error) {
    logger.error(error);
    return next(invalidToken(TOKEN_INVALID));
  }
};

exports.validateTokenAdmin = async (req, res, next) => {
  try {
    const authorization = req.header('authorization');

    if (!authorization) return next(invalidToken(TOKEN_REQUIRED));

    const [, token] = authorization.split(' ');

    const user = decoded(token);

    const status = await User.findOne({ where: { email: user.email }, raw: true });

    if (!status || status.role !== ADMIN) return next(unauthenticated(UNAUTHORIZED_USER));

    logger.info(`Admin: ${user.email} authenticated successfully`);

    // eslint-disable-next-line require-atomic-updates
    req.user = user;

    return next();
  } catch (error) {
    logger.error(error);
    return next(invalidToken(TOKEN_INVALID));
  }
};
