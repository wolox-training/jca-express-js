const { generateMessage } = require('../../app/helpers/utils');
const { BAD_REQUEST } = require('../../app/errors');
const { IS_BOOLEAN, EXIST, IS_INTEGER, NOT_EMPTY } = require('../../app/constants/validations');

const nonParameterRequired = (parameterName, msg, location, typeMessage) => ({
  msg: generateMessage(parameterName, msg, typeMessage),
  param: parameterName,
  location
});

exports.errorsSchema = {
  message: [
    nonParameterRequired('weetId', 'weet not exist', 'param', 'param'),
    nonParameterRequired('weetId', IS_INTEGER, 'param', 'param'),
    nonParameterRequired('score', NOT_EMPTY, 'body'),
    nonParameterRequired('score', EXIST, 'body'),
    nonParameterRequired('score', IS_BOOLEAN, 'body')
  ],
  internal_code: BAD_REQUEST
};
