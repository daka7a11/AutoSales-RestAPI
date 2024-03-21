function isUser(req, res, next) {
  if (!req.isAuth) {
    return res.status(401).json([{ message: "Unauthorized." }]);
  }
  next();
}
module.exports = {
  isUser,
};
