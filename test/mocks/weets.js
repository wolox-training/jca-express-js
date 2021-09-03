const { WEET_SUCCESS, GET_LIST_WEETS_SUCCESS } = require('../../app/constants/messages');

exports.expectedOutputWeetCreated = {
  message: WEET_SUCCESS
};

exports.expectedOutputGetWeets = {
  message: GET_LIST_WEETS_SUCCESS
};
