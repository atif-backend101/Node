module.exports = function addNewHeader(req, res, next) {
  res.setHeader("X-New-Policy", "Success");
  next();
};