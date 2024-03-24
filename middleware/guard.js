function isUser(req, res, next) {
  if (!req.isAuth) {
    return res.status(401).json("Unauthorized.");
  }
  next();
}
module.exports = {
  isUser,
};
