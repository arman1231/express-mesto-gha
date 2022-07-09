const { ERROR_INTERNAL_SERVER_ERROR } = require('../utils/errorCodes');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_INTERNAL_SERVER_ERROR;
  }
}

module.exports = InternalServerError;
