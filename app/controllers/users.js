const logger = require('../logger');
const { createUser } = require('../services/users');
const { encrypt } = require('../helpers/encrypt');
const { USER_SUCCESS } = require('../constants/messages');

exports.createUser = async (req, res, next) => {
  try {
    const { body: userData } = req;

    const encryptPassword = await encrypt(userData.password);

    const { name } = await createUser({ ...userData, password: encryptPassword });

    return res.status(201).json({
      message: USER_SUCCESS,
      data: { name }
    });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
