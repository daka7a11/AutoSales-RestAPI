const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    min: [4, "First name must be at least 4 characters."],
  },
  lastName: {
    type: String,
    min: [4, "Last name must be at least 4 characters."],
  },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: {
    type: String,
    min: [6, "Password must be at least 6 characters."],
  },
  myPosts: { type: [Schema.Types.ObjectId], ref: "Vehicle" },
});

module.exports = model("User", userSchema);
