const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');

const { JWT_SECRET_DEFAULT } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Unauthorized('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEFAULT);
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};
