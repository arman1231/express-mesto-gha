const { MONGO_DUPLICATE_ERROR } = require('../utils/errorCodes');

class MongoDuplicateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = MONGO_DUPLICATE_ERROR;
  }
}

module.exports = MongoDuplicateError;
