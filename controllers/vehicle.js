const router = require("express").Router();
const Vehicle = require("../models/Vehicle");

router.get("/", async (req, res) => {
  console.log(req.isAuth);
  console.log(req.userId);
  const vehicles = await Vehicle.find({});
  return res.json(vehicles);
});

router.post("/", async (req, res) => {
  const vehicle = new Vehicle({
    title: req.body.title,
    type: req.body.type,
    make: req.body.make,
    model: req.body.model,
    fuel: req.body.fuel,
    gearbox: req.body.gearbox,
    price: Number(req.body.price),
    manufacturingDate: new Date(req.body.manufacturing_date),
    region: req.body.region,
    horsePower: Number(req.body.hp),
    mileage: Number(req.body.mileage),
    images: req.body.images,
    description: req.body.description,
  });
  await vehicle.save();
  res.status(201).json(vehicle);
});

router.put("/:id", (req, res) => {
  res.json([{ type: "hi" }]);
});

router.delete("/:id", (req, res) => {
  res.json([{ type: "hi" }]);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const vehicle = await Vehicle.findById(id);
  //TODO: Error handling

  return res.json(vehicle);
});

module.exports = router;
