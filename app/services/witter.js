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

exports.getWitter = (num = randomNumber()) =>
  axios
    .get(`${witterApiUrl}/${num}`)
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

exports.getUserWeetsIds = async userId => {
  try {
    const weetIds = await Weet.findAll({ attributes: ['id'], where: { userId }, raw: true });
    if (weetIds.length === 0) throw databaseError('Some error occurred while getting the weets');
    return weetIds.map(({ id }) => id);
  } catch (error) {
    throw error;
  }
};
