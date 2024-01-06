const main = (err, req, res, next) => {
  console.log(err);
  res.status(err.httpStatus || 500).send({ ...err, status: 'error' });
};

export default main;
