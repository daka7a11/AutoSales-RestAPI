const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isUser } = require("../middleware/guard");
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const { ValidationErrorsMapper } = require("../util");
const jwt = require("jsonwebtoken");

const vehicleValidation = [
  body("title")
    .isLength({ min: 5 })
    .withMessage("Title should be at least 5 characters."),
  body("type").trim().notEmpty().withMessage("Type is required."),
  body("make").trim().notEmpty().withMessage("Make is required."),
  body("model").trim().notEmpty().withMessage("Model is required."),
  body("fuel").trim().notEmpty().withMessage("Fuel is required."),
  body("gearbox").trim().notEmpty().withMessage("Gearbox is required."),
  body("price").isNumeric().withMessage("Price is required."),
  body("manufacturingDate")
    .trim()
    .notEmpty()
    .withMessage("Manufacturing date is required."),
  body("region").trim().notEmpty().withMessage("Region is required."),
  body("horsePower").isNumeric().withMessage("Horse power is required."),
  body("mileage").isNumeric().withMessage("Mileage is required."),
  body("description").trim().notEmpty().withMessage("Description is required."),
];

router.get("/", async (req, res) => {
  const vehicles = await Vehicle.find({});
  console.log(req.query.color);
  return res.json(vehicles);
});

router.post("/", vehicleValidation, isUser, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return res
      .status(400)
      .json(errors.errors.map((e) => ValidationErrorsMapper(e)));
  }

  const user = await User.findById(req.userId);
  const vehicle = new Vehicle({
    title: req.body.title,
    type: req.body.type,
    make: req.body.make,
    model: req.body.model,
    fuel: req.body.fuel,
    gearbox: req.body.gearbox,
    price: Number(req.body.price),
    manufacturingDate: new Date(req.body.manufacturingDate),
    region: req.body.region,
    horsePower: Number(req.body.horsePower),
    mileage: Number(req.body.mileage),
    images: req.body.images,
    description: req.body.description,
    owner: user,
  });

  const createdVehicle = await vehicle.save();

  user.myPosts.push(createdVehicle);
  await user.save();

  res.status(201).json(createdVehicle);
});

router.put("/:id", vehicleValidation, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return res
      .status(400)
      .json(errors.errors.map((e) => ValidationErrorsMapper(e)));
  }

  const vehicle = await Vehicle.findById(req.params.id);

  vehicle.title = req.body.title;
  vehicle.type = req.body.type;
  vehicle.make = req.body.make;
  vehicle.model = req.body.model;
  vehicle.fuel = req.body.fuel;
  vehicle.gearbox = req.body.gearbox;
  vehicle.price = Number(req.body.price);
  vehicle.manufacturingDate = new Date(req.body.manufacturingDate);
  vehicle.region = req.body.region;
  vehicle.horsePower = Number(req.body.horsePower);
  vehicle.mileage = Number(req.body.mileage);
  vehicle.images = req.body.images;
  vehicle.description = req.body.description;

  try {
    const updatedVehicle = await vehicle.save();

    return res.status(202).json(updatedVehicle);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Error on updating." });
  }
});

router.delete("/:id", async (req, res) => {
  const vehicleId = req.params.id;
  const token = req.headers["authorization"];

  const vehicle = await Vehicle.findById(vehicleId).populate("owner");

  if (!vehicle) {
    return res.status(404).json("Vehicle not found.");
  }

  try {
    const verifiedToken = jwt.verify(token, "secretKey");
    if (verifiedToken._id !== vehicle.owner._id.toString()) {
      return res.status(403).json("Forbidden.");
    }

    await Vehicle.findByIdAndDelete(vehicleId);

    return res.json("Vehicle deleted.");
  } catch (e) {
    return res.status(401).json("Unauthorized.");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const vehicle = await Vehicle.findById(id).populate("owner");
    return res.json(vehicle);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
