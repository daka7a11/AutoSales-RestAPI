const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword,
  });

  const createdUser = await user.save();

  console.log(createdUser);

  res.json(createdUser);
});

module.exports = router;
