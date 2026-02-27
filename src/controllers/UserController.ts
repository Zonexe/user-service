import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const user = await UserService.register(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await UserService.login(email, password);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      return res.json(users);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const currentUser = req.user;

      if (currentUser?.role !== "admin" && currentUser?.id !== Number(id)) {
        return res
          .status(403)
          .json({ message: "Нет доступа к чужому профилю" });
      }

      const user = await UserService.getUserById(Number(id));
      return res.json(user);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  async block(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await UserService.toggleBlockStatus(Number(id), req.user);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new UserController();
