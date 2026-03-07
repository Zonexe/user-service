import { Router } from "express";
import UserController from "../controllers/UserController";
import { validate } from "../middlewares/validateMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { registerSchema, loginSchema } from "../dtos/user.schema";

const router = Router();

router.post("/register", validate(registerSchema), UserController.register);
router.post("/login", validate(loginSchema), UserController.login);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  UserController.getAll,
);
router.get("/:id", authMiddleware, UserController.getOne);
router.patch(
  "/:id/block",
  authMiddleware,
  roleMiddleware(["admin"]),
  UserController.block,
);

export default router;
