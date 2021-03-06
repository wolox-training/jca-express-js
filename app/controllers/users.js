const logger = require('../logger');
const { createUser, getUsers, upsertUser } = require('../services/users');
const { encrypt } = require('../helpers/encrypt');
const { ADMIN_USER_SUCCESS, USER_SUCCESS, GET_LIST_USERS_SUCCESS } = require('../constants/messages');
const { encode } = require('../helpers/jwt');
const { ADMIN, USER } = require('../constants/roles');

exports.signUp = async (req, res, next) => {
  try {
    const { body: userData } = req;

    const encryptPassword = await encrypt(userData.password);

    const { name } = await createUser({ ...userData, password: encryptPassword, role: USER });

    return res.status(201).json({
      message: USER_SUCCESS,
      data: { name }
    });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.signUpAdmin = async (req, res, next) => {
  try {
    const { body: userData } = req;

    const encryptPassword = await encrypt(userData.password);

    await upsertUser({ ...userData, password: encryptPassword, role: ADMIN });

    return res.status(201).json({
      message: ADMIN_USER_SUCCESS,
      data: { name: userData.name }
    });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.signIn = (req, res, next) => {
  try {
    const { id, email } = req.user;
    logger.info(`Generate token for user: ${email}`);
    const token = encode({ id, email });
    return res.status(200).json({ token });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.userList = async ({ query }, res, next) => {
  try {
    const data = await getUsers(query);
    return res.status(200).json({ message: GET_LIST_USERS_SUCCESS, data });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
