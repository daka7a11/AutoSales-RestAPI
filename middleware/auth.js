const jwt = require("jsonwebtoken");

function authProps(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    req.isAuth = false;
  }

  try {
    const decoded = jwt.decode(token, "secretKey");
    req.isAuth = true;
    req.userId = decoded._id;
  } catch (e) {
    req.isAuth = false;
  }

  next();
}

module.exports = {
  authProps,
};
