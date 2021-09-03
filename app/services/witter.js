const axios = require('axios').default;
const logger = require('../logger');
const { databaseError } = require('../errors');
const { Weet } = require('../models');
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
      return Promise.reject(badGatewayError(`Error in getWitter method => ${error.message}`));
    });

exports.createWeet = weet => {
  try {
    return Weet.create(weet);
  } catch (error) {
    logger.error(error);
    throw databaseError(`Error creating weet => ${error.message}`);
  }
};

exports.getAllWeets = ({ offset, limit }) => {
  try {
    return Weet.findAll({ offset, limit, raw: true });
  } catch (error) {
    logger.error(error);
    throw databaseError(`Error searching weets => ${error.message}`);
  }
};
