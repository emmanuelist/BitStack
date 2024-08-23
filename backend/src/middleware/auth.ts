import { Request, Response, NextFunction } from "express";
import { verifyMessageSignature } from "../services/stacksService";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No authorization header" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const [stxAddress, message, signature] = token.split(",");

    const isValid = await verifyMessageSignature(
      stxAddress,
      message,
      signature
    );

    if (!isValid) {
      return res.status(401).json({ message: "Invalid signature" });
    }

    req.user = { stxAddress };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
