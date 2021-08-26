const logger = require('../../logger');
const { TOKEN_INVALID, TOKEN_REQUIRED } = require('../../constants/messages');
const { invalidToken } = require('../../errors');
const { decoded } = require('../../helpers/jwt');

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
