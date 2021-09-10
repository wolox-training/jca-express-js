const logger = require('../../logger');
const { TOKEN_INVALID, TOKEN_REQUIRED, UNAUTHORIZED_USER } = require('../../constants/messages');
const { ADMIN } = require('../../constants/roles');
const { invalidToken, unauthenticated } = require('../../errors');
const { decoded } = require('../../helpers/jwt');
const { User, Token } = require('../../models');

exports.validateToken = async (req, res, next) => {
  try {
    const authorization = req.header('authorization');

    if (!authorization) return next(invalidToken(TOKEN_REQUIRED));

    const [, token] = authorization.split(' ');

    const existToken = await Token.findOne({ where: { token } });

    if (!existToken) return next(invalidToken(TOKEN_INVALID));

    const tokenDecoded = decoded(token);

    const user = await User.findOne({ where: { email: tokenDecoded.email }, raw: true });

    if (!user) return next(invalidToken(UNAUTHORIZED_USER));

    logger.info(`${user.email} authenticated successfully`);

    // eslint-disable-next-line require-atomic-updates
    req.user = user;

    return next();
  } catch (error) {
    logger.error(error);
    return next(invalidToken(TOKEN_INVALID));
  }
};

exports.validateAdmin = ({ user: { role, email } }, res, next) => {
  try {
    if (role !== ADMIN) return next(unauthenticated(UNAUTHORIZED_USER));
    logger.info(`Admin: ${email} authenticated successfully`);
    return next();
  } catch (error) {
    logger.error(error);
    return next(invalidToken(TOKEN_INVALID));
  }
};
