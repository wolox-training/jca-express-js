const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.WITTER_API_ERROR = 'witter_api_error';
exports.badGatewayError = message => internalError(message, exports.WITTER_API_ERROR);

exports.BAD_REQUEST = 'bad_request';
exports.badRequest = message => internalError(message, exports.BAD_REQUEST);

exports.DUPLICATE_VALUES = 'duplicate_values';
exports.duplicateValuesError = message => internalError(message, exports.DUPLICATE_VALUES);

exports.INVALID_CREDENTIALS = 'invalid_credentials';
exports.invalidCredentials = message => internalError(message, exports.INVALID_CREDENTIALS);

exports.INVALID_TOKEN = 'invalid_token';
exports.invalidToken = message => internalError(message, exports.INVALID_TOKEN);
