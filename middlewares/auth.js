const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.status(401).send({ message: 'Authorization required' });
  }

  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return res.status(401).send({ message: 'Authorization required' });
  }
  // const authorization = req.headers;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   return res.status(401).send({ message: 'Authorization required' });
  // }

  // const token = authorization.replace('Bearer ', '');
  // let payload;

  // try {
  //   payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  // } catch (err) {
  //   return res.status(401).send({ message: 'Authorization required' });
  // }

  req.user = payload;

  return next();
};
