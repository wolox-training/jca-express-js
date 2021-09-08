const logger = require('../logger');
const { databaseError, badRequest } = require('../errors');
const { Rating, sequelize } = require('../models');
const { getUserWeetsIds } = require('../services/witter');
const { updatePosition, getPosition } = require('../services/users');

exports.getRating = ({ userId, weetId }, transaction) => {
  try {
    return Rating.findOne({
      attributes: { exclude: ['userId', 'weetId'] },
      where: { userId, weetId },
      transaction
    });
  } catch (error) {
    logger.error(error);
    throw databaseError('Error get rating from database');
  }
};

exports.createRating = ({ userId, weetId, score }, transaction) => {
  try {
    return Rating.create({ userId, weetId, score }, { transaction });
  } catch (error) {
    logger.error(error);
    throw databaseError('The rate could not be created');
  }
};

exports.totalRatingByIds = async (weetId, transaction) => {
  try {
    const total = await Rating.findAll({
      attributes: ['score'],
      where: { weetId },
      raw: true,
      transaction
    });
    return total.map(({ score }) => (score ? 1 : -1)).reduce((a, b) => a + b);
  } catch (error) {
    logger.error(error);
    throw databaseError('The rate could not be created');
  }
};

exports.transactionRatingWeet = async ({ score, userId, weetId }, weet) => {
  const transaction = await sequelize.transaction();
  try {
    const alreadyRated = await exports.getRating({ userId, weetId }, transaction);
    if (alreadyRated) {
      if (alreadyRated.score === score) throw badRequest('You already rated this weet');
      alreadyRated.score = score;
      await alreadyRated.save({ transaction });
    } else await exports.createRating({ userId, weetId, score }, transaction);

    // Update user position
    const idWeets = await getUserWeetsIds(weet.userId, transaction);
    const totalScore = await exports.totalRatingByIds(idWeets, transaction);

    await updatePosition({ position: getPosition(totalScore), id: weet.userId }, transaction);

    await transaction.commit();
  } catch (error) {
    if (transaction.rollback) await transaction.rollback();
    logger.error(error);
    throw error;
  }
};
