const Cars = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = (req, res, next) => {
  const { id } = req.params;
  Cars.getById(id)
    .then((car) => {
      if (!car) {
        next({
          sucess: false,
          status: 404,
          message: `car with id ${id} is not found`,
        });
      } else {
        req.car = car;
        next();
      }
    })
    .catch(next);
};

const checkCarPayload = (req, res, next) => {
  // const error = { status : 400 }
  if (!req.body.vin)
    return next({
      success: false,
      status: 400,
      message: "vin is missing",
    });
  if (!req.body.make)
    return next({
      success: false,
      status: 400,
      message: "make is missing",
    });
  if (!req.body.model)
    return next({
      success: false,
      status: 400,
      message: "model is missing",
    });
  if (!req.body.mileage)
    return next({
      success: false,
      status: 400,
      message: "mileage is missing",
    });
  next();
};

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  if (vinValidator.validate(vin)) {
    next();
  } else {
    next({
      success: false,
      status: 400,
      message: `vin ${vin} is invalid`,
    });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const { vin } = req.body;
    const existing = await Cars.getByVin(vin);
    if (existing) {
      next({
        success: false,
        status: 400,
        message: `vin ${vin} already exists`,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
