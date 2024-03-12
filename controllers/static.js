const fs = require("fs");
const router = require("express").Router();

router.get("/makes-models", (req, res) => {
  fs.readFile("./static/makes-models.json", (err, data) => {
    if (err) {
      const error = new Error("Could not read makes-models file!");
      error.code = 500;
      throw error;
    }

    const makesModels = JSON.parse(data);
    res.json(JSON.stringify(makesModels));
  });
});

router.get("/regions", (req, res) => {
  fs.readFile("./static/regions.json", (err, data) => {
    if (err) {
      const error = new Error("Could not read regions file!");
      error.code = 500;
      throw error;
    }

    const makesModels = JSON.parse(data);
    res.json(JSON.stringify(makesModels));
  });
});

module.exports = router;
