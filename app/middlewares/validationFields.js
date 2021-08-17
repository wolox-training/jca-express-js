const { validationResult } = require('express-validator');
const { badRequest } = require('../errors');

exports.validationsFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(badRequest(errors.array()));
    return;
  }
  next();
};
