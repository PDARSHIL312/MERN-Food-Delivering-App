import { NextFunction, Response, Request } from "express";
import { body, validationResult } from "express-validator";

const handleValidationError = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req); //here below array all the errors will get add and so here validationResult will see if the okay or not?
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"), // here body means not body it is middleware function extend from the  express-validator
  body("city").isString().notEmpty().withMessage("city must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address must be a string"),
  body("countryCode")
    .isString()
    .notEmpty()
    .withMessage("Country must be a string"),
  handleValidationError,
];
