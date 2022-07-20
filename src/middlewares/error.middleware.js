module.exports = (err, _req, res, _next) => {
  const { message } = err;
  const code = err.code || 500;

  res.status(code).json({ message });
};