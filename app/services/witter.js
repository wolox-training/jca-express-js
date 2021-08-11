const axios = require('axios').default;
const logger = require('../logger');

const WitterInstance = axios.create({
  baseURL: 'http://numbersapi.com'
});

exports.getWitter = (num = Math.floor(Math.random() * 100)) =>
  WitterInstance.get(`/${num}`)
    .then(res => res.data)
    .catch(error => {
      logger.error(`Request Error => ${error.message}`);
      throw new Error(`Error in getWitter method => ${error.message}`);
    });
