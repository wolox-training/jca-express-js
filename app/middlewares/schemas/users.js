const { checkSchema } = require('express-validator');

// Regex
const emailRegex = /^[a-zA-Z0-9_.+-]+@wolox\.(mx|co|cl|com|com\.ar)$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z_.+\-@$!%*#?&])([a-zA-Z0-9_.+\-@$!%*#?&]){8,}$/;

const generateMessage = (field, message) => `Error in ${field} field, ${message}.`;

const validationCodes = {
  EXIST: 'is required',
  IS_STRING: 'must be a string',
  NOT_EMPTY: 'must be non empty',
  MAIL_MATCHES: 'is not an email address allowed',
  PASSWORD_MATCHES: 'is not a password allowed'
};

exports.createUserValidator = checkSchema({
  name: {
    in: ['body'],
    exists: { errorMessage: generateMessage('name', validationCodes.EXIST) },
    isString: { errorMessage: generateMessage('name', validationCodes.IS_STRING) },
    notEmpty: {
      value: true,
      errorMessage: generateMessage('name', validationCodes.NOT_EMPTY)
    }
  },
  surname: {
    in: ['body'],
    exists: { errorMessage: generateMessage('surname', validationCodes.EXIST) },
    isString: { errorMessage: generateMessage('surname', validationCodes.IS_STRING) },
    notEmpty: {
      value: true,
      errorMessage: generateMessage('surname', validationCodes.NOT_EMPTY)
    }
  },
  email: {
    in: ['body'],
    exists: { errorMessage: generateMessage('email', validationCodes.EXIST) },
    isString: { errorMessage: generateMessage('email', validationCodes.IS_STRING) },
    notEmpty: { errorMessage: generateMessage('email', validationCodes.NOT_EMPTY) },
    matches: {
      options: emailRegex,
      errorMessage: generateMessage('email', validationCodes.MAIL_MATCHES)
    }
  },
  password: {
    in: ['body'],
    exists: { errorMessage: generateMessage('password', validationCodes.EXIST) },
    isString: { errorMessage: generateMessage('password', validationCodes.IS_STRING) },
    notEmpty: { errorMessage: generateMessage('password', validationCodes.NOT_EMPTY) },
    matches: {
      options: passwordRegex,
      errorMessage: generateMessage('password', validationCodes.PASSWORD_MATCHES)
    }
  }
});
