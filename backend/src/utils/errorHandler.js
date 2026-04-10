const errorHandler = (error, req, res, _next) => {
  if (error.name === "SequelizeValidationError") {
    const errObj = {};
    error.errors.map((er) => {
      errObj[er.path] = er.message;
    });
    req.log.error(errObj);
    return res.status(400).json(errObj);
  }
  if (error.name === "SequelizeForeignKeyConstraintError") {
    const errObj = {
      message: error.message,
      error: error.parent.detail,
    };
    req.log.error(errObj);
    return res.status(400).json(errObj);
  }
  const errObj = {
    message: error.message,
    error: error,
  }
  req.log.error(errObj);
  return res.status(500).json(errObj);
};

module.exports = errorHandler;
