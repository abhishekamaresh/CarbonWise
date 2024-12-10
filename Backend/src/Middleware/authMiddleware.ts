import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction, RequestHandler } from "express";

dotenv.config();

// Extend Request to include `user`
interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const authMiddleware: RequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token not provided, unauthorized" });
    return; // Ensure no further processing
  }

  const token = authHeader.split(" ")[1];

  if (!process.env.JWT_KEY) {
    res.status(500).json({ message: "JWT key is not defined in environment variables" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded; // Attach decoded payload to `req.user`
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error instanceof Error ? error.message : "Unknown error" });
  }
};
