const { USER_EXIST, USER_SUCCESS } = require('../../app/constants/messages');
const { PASSWORD_MATCHES, EXIST, MAIL_MATCHES } = require('../../app/constants/validations');
const { DUPLICATE_VALUES, BAD_REQUEST } = require('../../app/errors');
const { generateMessage } = require('../../app/helpers/utils');

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

exports.expectedOutputEmailDuplicate = {
  message: USER_EXIST,
  internal_code: DUPLICATE_VALUES
};

exports.nonParameterRequired = (parameterName, msg) => ({
  msg: generateMessage(parameterName, msg),
  param: parameterName,
  location: 'body'
});

exports.expectedOutputInvalidPass = {
  message: [exports.nonParameterRequired('password', PASSWORD_MATCHES)],
  internal_code: BAD_REQUEST
};

exports.expectedOutputEmptyBody = {
  message: [
    exports.nonParameterRequired('name', EXIST),
    exports.nonParameterRequired('surname', EXIST),
    exports.nonParameterRequired('email', EXIST),
    exports.nonParameterRequired('password', EXIST)
  ],
  internal_code: BAD_REQUEST
};

exports.expectedOutputInvalidDomain = {
  message: [exports.nonParameterRequired('email', MAIL_MATCHES)],
  internal_code: BAD_REQUEST
};
