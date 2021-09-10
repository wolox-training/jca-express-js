const { checkSchema } = require('express-validator');
const { generateMessage } = require('../../helpers/utils');
const { EXIST, NOT_EMPTY, IS_BOOLEAN, IS_INTEGER } = require('../../constants/validations');
const { Weet } = require('../../models');

exports.checkRating = checkSchema({
  weetId: {
    in: ['params'],
    notEmpty: { errorMessage: generateMessage('weetId', NOT_EMPTY, 'param') },
    isInt: { errorMessage: generateMessage('weetId', IS_INTEGER, 'param') },
    toInt: true,
    bail: true,
    custom: {
      options: (weetId, { req }) =>
        Weet.findByPk(weetId, { raw: true }).then(weet => {
          if (!weet) throw new Error(generateMessage('weetId', 'weet not exist', 'param'));
          req.weet = weet;
        })
    }
  },
  score: {
    in: ['body'],
    exists: { errorMessage: generateMessage('score', EXIST) },
    notEmpty: { errorMessage: generateMessage('score', NOT_EMPTY) },
    isBoolean: { errorMessage: generateMessage('score', IS_BOOLEAN) }
  }
});
