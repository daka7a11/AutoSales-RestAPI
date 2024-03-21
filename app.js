const express = require("express");
const database = require("./config/database");
const vehicleRouter = require("./controllers/vehicle");
const staticRouter = require("./controllers/static");
const userRouter = require("./controllers/user");
const { authProps } = require("./middleware/auth");

async function start() {
  const app = express();
  app.use(express.json({ limit: "10mb" }));
  await database();

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  });

  app.use(authProps);

  app.use("/vehicles", vehicleRouter);
  app.use("/static", staticRouter);
  app.use("/users", userRouter);

  app.listen(8000, () => console.log("Server listening on port 8000."));
}
start();
