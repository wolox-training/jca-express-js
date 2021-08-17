const { validationResult } = require('express-validator');
const { badRequest } = require('../errors');

exports.validateSchema = schema => [
  ...schema,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(badRequest(errors.array()));
    return next();
  }
];
