const logger = require('../logger');
const { getWitter, createWeet, getAllWeets } = require('../services/witter');
const { WEET_SUCCESS, GET_LIST_WEETS_SUCCESS } = require('../constants/messages');

exports.createWeet = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const content = await getWitter();
    const data = await createWeet({ content, userId });
    return res.status(201).json({
      message: WEET_SUCCESS,
      data
    });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.getWeets = async ({ query }, res, next) => {
  try {
    const data = await getAllWeets(query);
    return res.status(200).json({
      message: GET_LIST_WEETS_SUCCESS,
      data
    });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
