const logger = require('../logger');
const { getWitter, createWeet } = require('../services/witter');
const { WEED_SUCCESS } = require('../constants/messages');

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
