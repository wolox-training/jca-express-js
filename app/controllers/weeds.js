const logger = require('../logger');
const { getWitter, createWeet, getAllWeeds } = require('../services/witter');
const { WEED_SUCCESS, GET_LIST_WEEDS_SUCCESS } = require('../constants/messages');

exports.createWeed = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const content = await getWitter();
    const data = await createWeet({ content, userId });
    return res.status(201).json({
      message: WEED_SUCCESS,
      data
    });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.getWeeds = async ({ query }, res, next) => {
  try {
    const data = await getAllWeeds(query);
    return res.status(200).json({
      message: GET_LIST_WEEDS_SUCCESS,
      data
    });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
