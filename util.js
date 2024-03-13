function ValidationErrorsMapper(error) {
  return {
    field: error.path,
    message: error.msg,
  };
}

module.exports = {
  ValidationErrorsMapper,
};
