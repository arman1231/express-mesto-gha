const ERROR_BAD_REQUEST = 400;
const ERROR_UNAUTHORIZED = 401;
const ERROR_FORBIDDEN = 403;
const ERROR_NOT_FOUND = 404;
const ERROR_DUPLICATE = 409;
const ERROR_INTERNAL_SERVER_ERROR = 500;
const MONGO_DUPLICATE_ERROR = 11000;

module.exports = {
  ERROR_BAD_REQUEST,
  ERROR_UNAUTHORIZED,
  ERROR_FORBIDDEN,
  ERROR_NOT_FOUND,
  ERROR_DUPLICATE,
  ERROR_INTERNAL_SERVER_ERROR,
  MONGO_DUPLICATE_ERROR,
};
