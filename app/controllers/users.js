const { createUser } = require('../services/users');
const { encrypt } = require('../helpers/encryp');
const logger = require('../logger');

exports.createUser = async (req, res, next) => {
  try {
    const { body: userData } = req;

    const encryptPassword = encrypt(userData.password);

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
