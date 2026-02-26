import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Не авторизован" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(404).json({ message: "Данной страницы не существует" });
    }

    next();
  };
};
