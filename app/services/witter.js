const axios = require('axios').default;
const logger = require('../logger');
const { badGatewayError } = require('../errors');
const {
  common: {
    services: { witterApiUrl }
  }
} = require('../../config');

const randomNumber = () => Math.floor(Math.random() * 100);

const WitterInstance = axios.create({
  baseURL: witterApiUrl
});

exports.getWitter = (num = randomNumber()) =>
  WitterInstance.get(`/${num}`)
    .then(res => res.data)
    .catch(error => {
      logger.error(`Request Error => ${error.message}`);
      return  Promise.reject(badGatewayError(`Error in getWitter method => ${error.message}`));
    });
