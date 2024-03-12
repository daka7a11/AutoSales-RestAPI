const { Schema, model } = require("mongoose");

const vehicleSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  fuel: { type: String, required: true },
  gearbox: { type: String, required: true },
  price: { type: Number, required: true },
  manufacturingDate: { type: Date, required: true },
  region: { type: String, required: true },
  horsePower: { type: Number, required: true },
  mileage: { type: Number, required: true },
  images: { type: [String] },
  description: { type: String, required: true },
});

module.exports = model("Vehicle", vehicleSchema);
