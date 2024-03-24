require("dotenv").config();
const mongoose = require("mongoose");

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.aneit50.mongodb.net/autosales`;
// const connectionString = "mongodb://localhost:27017/AutoSales";
module.exports = database = () => {
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(err);
      console.error("Connection to database failed!");
      process.exit(1);
    });
};
