const { GeneralError } = require('../utils/error');
const logger = require("../utils/logger");

const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    logger.error(err.getCode()+ err.message);
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message
    });
  }
  logger.error(500 + err.message)
  return res.status(500).json({
    status: 'error',
    message: err.message
  });
}


module.exports = handleErrors;
