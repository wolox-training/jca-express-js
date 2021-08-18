const { checkSchema } = require('express-validator');
const { generateMessage } = require('../../helpers/utils');
const { emailRegex, passwordRegex } = require('../../constants/regex');
const {
  EXIST,
  IS_STRING,
  MAIL_MATCHES,
  NOT_EMPTY,
  PASSWORD_MATCHES
} = require('../../constants/validations');

exports.createUserValidator = checkSchema({
  name: {
    in: ['body'],
    exists: { errorMessage: generateMessage('name', EXIST) },
    isString: { errorMessage: generateMessage('name', IS_STRING) },
    notEmpty: {
      value: true,
      errorMessage: generateMessage('name', NOT_EMPTY)
    }
  },
  surname: {
    in: ['body'],
    exists: { errorMessage: generateMessage('surname', EXIST) },
    isString: { errorMessage: generateMessage('surname', IS_STRING) },
    notEmpty: {
      value: true,
      errorMessage: generateMessage('surname', NOT_EMPTY)
    }
  },
  email: {
    in: ['body'],
    exists: { errorMessage: generateMessage('email', EXIST) },
    isString: { errorMessage: generateMessage('email', IS_STRING) },
    notEmpty: { errorMessage: generateMessage('email', NOT_EMPTY) },
    matches: {
      options: emailRegex,
      errorMessage: generateMessage('email', MAIL_MATCHES)
    }
  },
  password: {
    in: ['body'],
    exists: { errorMessage: generateMessage('password', EXIST) },
    isString: { errorMessage: generateMessage('password', IS_STRING) },
    notEmpty: { errorMessage: generateMessage('password', NOT_EMPTY) },
    matches: {
      options: passwordRegex,
      errorMessage: generateMessage('password', PASSWORD_MATCHES)
    }
  }
});
