const logger = require('../logger');
const { transactionRatingWeet } = require('../services/ratings');
const { RATING_WEET_SUCCESS } = require('../constants/messages');

exports.ratingWeets = async (
  { user: { id: userId }, params: { weetId }, body: { score }, weet },
  res,
  next
) => {
  try {
    await transactionRatingWeet({ score, userId, weetId }, weet);
    return res.status(201).json({ message: RATING_WEET_SUCCESS });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
