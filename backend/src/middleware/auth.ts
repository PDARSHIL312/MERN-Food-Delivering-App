import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/user";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}


export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",

});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("headersssss" + req.headers);
  const { authorization } = req.headers;
  // console.log("authorization" + authorization);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized!!!!", authorization: authorization });
  }

  const token = authorization.split(" ")[1];
  // console.log("Received token:", token); // Log token for inspection

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    // console.log(decoded);
    const auth0Id = decoded.sub;

    // console.log("Decoded token payload:", decoded); // Log decoded data

    const user = await User.findOne({ auth0Id });
    // console.log(user);

    if (!user) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    

    next();
  } catch (error) {
    console.error("Error parsing token:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
