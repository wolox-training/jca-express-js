const jwt = require('jwt-simple');
const {
  common: {
    utils: { jwtSecret }
  }
} = require('../../config');

exports.encode = payload => jwt.encode(payload, jwtSecret);
exports.decoded = token => jwt.decode(token, jwtSecret);
