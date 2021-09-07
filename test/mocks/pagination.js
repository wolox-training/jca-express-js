const { BAD_REQUEST } = require('../../app/errors');
const { generateMessage } = require('../../app/helpers/utils');

const nonParameterRequired = (parameterName, msg, location, typeMessage) => ({
  msg: generateMessage(parameterName, msg, typeMessage),
  param: parameterName,
  location
});

exports.expectedEmptyQuery = {
  message: [
    nonParameterRequired('offset', 'must be a valid number greater than zero', 'query', 'query'),
    nonParameterRequired(
      'limit',
      'must be a valid number greater than zero and less than 20',
      'query',
      'query'
    )
  ],
  internal_code: BAD_REQUEST
};
