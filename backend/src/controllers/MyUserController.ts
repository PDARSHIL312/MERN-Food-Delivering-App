import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  //1) check if the user Exit or not\
  // 2)create the user if it does not exist
  //3) return the user object to the calling client

  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send();
    }
    const { email } = req.body;
    const newUser = await User.create({ auth0Id, email });

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Creating the User" });
  }
};

export default { createCurrentUser };
