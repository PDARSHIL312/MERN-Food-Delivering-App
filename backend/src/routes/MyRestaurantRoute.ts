import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

//  /api/my/restaurant
// router.post(
//   "/",
//   // jwtCheck, // it is used to verify he token stuff
//   // jwtParse, // it is used to take the information from the token and used it into Request object for data
//   upload.single("imageFile"),
//   // validateMyRestaurantRequest,
//   MyRestaurantController.createMyRestaurant
// );
router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.createMyRestaurant
);

export default router;
