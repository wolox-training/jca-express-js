const { checkSchema } = require('express-validator');
const { generateMessage } = require('../../helpers/utils');

exports.checkPagination = checkSchema({
  offset: {
    in: ['query'],
    isInt: {
      options: {
        min: 0
      },
      errorMessage: generateMessage('offset', 'must be a valid number greater than zero', 'query')
    },
    toInt: true
  },
  limit: {
    in: ['query'],
    isInt: {
      options: {
        min: 0,
        max: 20
      },
      errorMessage: generateMessage(
        'limit',
        'must be a valid number greater than zero and less than 20',
        'query'
      )
    },
    toInt: true
  }
});
