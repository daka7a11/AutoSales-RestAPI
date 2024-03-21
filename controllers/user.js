const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const router = require("express").Router();
const User = require("../models/User");
const { ValidationErrorsMapper } = require("../util");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const error = [{ message: "Invalid email or password." }];

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json(error);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json(error);
  }

  const userData = {
    _id: user._id,
    firstName: user.firstName,
    email: user.email,
  };

  const token = createToken(userData);

  return res.json({
    token,
    ...userData,
  });
});

router.post(
  "/register",
  [
    body("firstName")
      .isLength({ min: 4 })
      .withMessage("First name should be at least 4 characters."),
    body("lastName")
      .isLength({ min: 4 })
      .withMessage("Last name should be at least 4 characters."),
    body("email")
      .isEmail()
      .withMessage("Invalid email address.")
      .custom(CheckEmail),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters.")
      .custom((value, { req }) => {
        return value === req.body.confirmPassword;
      })
      .withMessage("Passwords do not match."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.errors.map(ValidationErrorsMapper));
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });

    const createdUser = await user.save();

    const userData = {
      _id: createdUser._id,
      firstName: createdUser.firstName,
      email: createdUser.email,
    };

    const token = createToken(userData);

    return res.status(201).json({
      token,
      ...userData,
    });
  }
);

module.exports = router;

async function CheckEmail(email) {
  const user = await User.findOne({ email: email });
  if (user) {
    throw new Error(`${email} already exists.`);
  }
}

function createToken(userData) {
  return jwt.sign(userData, "secretKey");
}
