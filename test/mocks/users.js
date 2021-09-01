const {
  USER_EXIST,
  USER_SUCCESS,
  ADMIN_USER_SUCCESS,
  USER_INVALID_CREDENTIAL,
  TOKEN_REQUIRED,
  TOKEN_INVALID,
  UNAUTHORIZED_USER
} = require('../../app/constants/messages');
const {
  DUPLICATE_VALUES,
  BAD_REQUEST,
  INVALID_CREDENTIALS,
  INVALID_TOKEN,
  ERROR_UNAUTHENTICATED
} = require('../../app/errors');
const { PASSWORD_MATCHES, EXIST, MAIL_MATCHES } = require('../../app/constants/validations');
const { generateMessage } = require('../../app/helpers/utils');
const { encrypt } = require('../../app/helpers/encrypt');

exports.expectedInput = {
  name: 'John',
  surname: 'Doe',
  email: 'john.doe@wolox.co',
  password: 'A12345678'
};

exports.expectedOutput = {
  message: USER_SUCCESS,
  data: { name: exports.expectedInput.name }
};

exports.expectedOutputAdmin = {
  message: ADMIN_USER_SUCCESS,
  data: { name: exports.expectedInput.name }
};

exports.expectedOutputEmailDuplicate = {
  message: USER_EXIST,
  internal_code: DUPLICATE_VALUES
};

exports.expectedOutputUserRoleInvalid = {
  message: UNAUTHORIZED_USER,
  internal_code: ERROR_UNAUTHENTICATED
};

exports.nonParameterRequired = (parameterName, msg, location, typeMessage) => ({
  msg: generateMessage(parameterName, msg, typeMessage),
  param: parameterName,
  location
});

exports.expectedOutputInvalidPass = {
  message: [exports.nonParameterRequired('password', PASSWORD_MATCHES)],
  internal_code: BAD_REQUEST
};

exports.expectedOutputEmptyBody = {
  message: [
    exports.nonParameterRequired('name', EXIST, 'body'),
    exports.nonParameterRequired('surname', EXIST, 'body'),
    exports.nonParameterRequired('email', EXIST, 'body'),
    exports.nonParameterRequired('password', EXIST, 'body')
  ],
  internal_code: BAD_REQUEST
};

exports.expectedOutputEmptyBodyAuth = {
  message: [
    exports.nonParameterRequired('email', EXIST, 'body'),
    exports.nonParameterRequired('password', EXIST, 'body')
  ],
  internal_code: BAD_REQUEST
};

exports.expectedOutputInvalidDomain = {
  message: [exports.nonParameterRequired('email', MAIL_MATCHES, 'body')],
  internal_code: BAD_REQUEST
};

exports.expectedOutputErrorCredentials = {
  message: USER_INVALID_CREDENTIAL,
  internal_code: INVALID_CREDENTIALS
};

exports.expectedEmptyQueryGetUser = {
  message: [
    exports.nonParameterRequired('offset', 'must be a valid number greater than zero', 'query', 'query'),
    exports.nonParameterRequired(
      'limit',
      'must be a valid number greater than zero and less than 20',
      'query',
      'query'
    )
  ],
  internal_code: BAD_REQUEST
};

exports.expectedOutputTokenRequired = {
  message: TOKEN_REQUIRED,
  internal_code: INVALID_TOKEN
};

exports.expectedOutputTokenInvalid = {
  message: TOKEN_INVALID,
  internal_code: INVALID_TOKEN
};

exports.encryptedPassword = () => encrypt(exports.expectedInput.password);
