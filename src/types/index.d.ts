import { UserAttributes } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: "admin" | "user";
      };
    }
  }
}
