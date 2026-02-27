import { Router } from "express";
import UserController from "../controllers/UserController";
import { validate } from "../middlewares/validateMiddleware";
import { registerSchema, loginSchema } from "../dtos/user.schema";

const router = Router();

router.post("/register", validate(registerSchema), UserController.register);

router.post("/login", validate(loginSchema), UserController.login);
export default router;
