import { Request, Response, NextFunction } from "express";
import { ZodError, ZodIssue } from "zod";

interface IZodSchema {
  parse: (data: unknown) => unknown;
}

export const validate =
  (schema: IZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Ошибка валидации",
          errors: error.issues.map((issue: ZodIssue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  };
