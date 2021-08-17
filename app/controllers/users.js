const { createUser } = require('../services/users');
const { encrypt } = require('../helpers/encrypt');
const logger = require('../logger');

exports.createUser = async (req, res, next) => {
  try {
    const { body: userData } = req;

    const encryptPassword = await encrypt(userData.password);

    const { name } = await createUser({ ...userData, password: encryptPassword });

    res.status(201).json({
      message: 'User created successfully',
      data: { name }
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};