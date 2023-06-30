const Joi = require("@hapi/joi")

const validateBranch = (req, res, next) => {
  const schema = Joi.object({
    branch: Joi.string().required(),
    address: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    const validatorError = error.details.map((detail) => detail.message);
    res.status(409).json({
      message: validatorError,
    });
  } else {
    next();
  }
};

const validateMenu = (req, res, next) => {
  const schema = Joi.object({
    refuelMax: Joi.object().required(),
    citizenMeal: Joi.object().required(),
    chickWizz: Joi.object().required(),
    
  });
  const { error } = schema.validate(req.body);
  if (error) {
    const validatorError = error.details.map((detail) => detail.message);
    res.status(409).json({
      message: validatorError,
    });
  } else {
    next();
  }
};
module.exports = { validateBranch, validateMenu };