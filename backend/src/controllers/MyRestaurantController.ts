// import { Request, Response } from "express";
// import Restaurant from "../models/restaurant";
// import cloudinary from "cloudinary";
// import mongoose from "mongoose";

// // Main function
// const createMyRestaurant = async (req: Request, res: Response) => {
//   try {
//     // Check if restaurant already exists
//     const existingRestaurant = await Restaurant.findOne({ user: req.userId });

//     if (existingRestaurant) {
//       return res.status(409).json({ message: "Restaurant already exists" });
//     }

//     // Check if an image is provided
//     if (!req.file) {
//       return res.status(400).json({ message: "No image file provided" });
//     }

//     const image = req.file as Express.Multer.File;
//     const base64Image = Buffer.from(image.buffer).toString("base64");
//     const dataURI = `data:${image.mimetype};base64,${base64Image}`;

//     // Upload image to Cloudinary
//     const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

//     // Create restaurant entry
//     const restaurant = new Restaurant(req.body);
//     restaurant.imageUrl = uploadResponse.url;
//     restaurant.user = new mongoose.Types.ObjectId(req.userId);
//     restaurant.lastUpdated = new Date();
//     `a`;
//     // Save restaurant entry
//     await restaurant.save();

//     // Return the created restaurant
//     res.status(201).json(restaurant);
//   } catch (error: any) {
//     console.error("Error creating restaurant:", error);
//     res
//       .status(500)
//       .json({ message: "Something went wrong", error: error.message });
//   }
// };

// export default {
//   createMyRestaurant,
// };

import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    // if (req.userId) {
    console.log(req.userId);
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res.status(409).json({ message: "Restaurant already exists" });
    }

    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    const restaurant = new Restaurant({
      ...req.body,
      imageUrl: uploadResponse.url,
      user: new mongoose.Types.ObjectId(req.userId),
      lastUpdated: new Date(),
    });

    await restaurant.save();

    res.status(201).send(restaurant);
    // } else {
    //   res.status(404).json({ message: "userID not passing here" });
    // }
  } catch (error: any) {
    console.error("Error creating restaurant:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export default {
  createMyRestaurant,
};
