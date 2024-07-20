import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const express = require("express");
const router = express.Router();

router.get(
  "/search/:city",
  param()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid String"),
  RestaurantController.searchRestaurant
);

export default router;
