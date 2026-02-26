// src/controllers/UserController.ts

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
}

export default new UserController();
