const router = require("express").Router();
const Cars = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
} = require("./cars-middleware");

// METHOD(GET) => API/CARS/
router.get("/", (req, res, next) => {
  Cars.getAll(req.params.id)
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch(next);
});

// METHOD(GET) GET CAR BY ID => API/CAR/:ID
router.get("/:id", checkCarId, (req, res) => {
  res.status(200).json(req.carFromDb);
});

// METHOD(POST) => API/CARS/
router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const newCar = await Cars.create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

// GLOBAL ERROR HANDLING => API/CARS/
router.use((err, req, res, next) => { // eslint-disable-line
  // eslint-disable-line
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
