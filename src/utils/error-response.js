const commonErrorHandling = (statusCode, errorMessage) => {
  throw Object.assign({
    code: statusCode,
    error: {
      message: errorMessage,
    },
  });
};

module.exports = { commonErrorHandling };
