const { WEET_SUCCESS, GET_LIST_WEETS_SUCCESS } = require('../../app/constants/messages');

exports.expectedOutputWeetCreated = {
  message: WEET_SUCCESS
};

exports.expectedOutputGetWeets = {
  message: GET_LIST_WEETS_SUCCESS
};

exports.weet =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ma';
