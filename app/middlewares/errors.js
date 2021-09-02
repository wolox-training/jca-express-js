const errors = require('../errors');
const logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.DATABASE_ERROR]: 503,
  [errors.DEFAULT_ERROR]: 500,
  [errors.WITTER_API_ERROR]: 502,
  [errors.BAD_REQUEST]: 400,
  [errors.DUPLICATE_VALUES]: 409,
  [errors.INVALID_CREDENTIALS]: 403,
  [errors.INVALID_TOKEN]: 401,
  [errors.ERROR_UNAUTHENTICATED]: 401
};

exports.handle = (error, req, res, next) => {
  if (error.internalCode) res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(error);
  return res.send({ message: error.message, internal_code: error.internalCode });
};
