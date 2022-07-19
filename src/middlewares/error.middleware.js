module.exports = (err, _req, res, _next) => {
  const { code, message } = err;
  if (!code) return res.status(500).json({ message });

  res.status(code).json({ message });
};