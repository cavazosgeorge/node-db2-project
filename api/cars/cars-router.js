const router = require("express").Router();
const Cars = require("./cars-model");
const {
  checkCarId,
  checkPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
} = require("./cars-middleware");

router.get("/", (req, res, next) => {
  Cars.getAll(req.params.id)
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch(next);
});

router.get("/:id", checkCarId, (req, res) => {
  res.status(200).json(req.carFromDb);
});

module.exports = router;
