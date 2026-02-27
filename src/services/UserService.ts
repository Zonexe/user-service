import User, { UserCreationAttributes } from "../models/User";
import { hashPassword, comparePassword } from "../utils/hash";
import jwt from "jsonwebtoken";

class UserService {
  async register(data: UserCreationAttributes) {
    const candidate = await User.findOne({ where: { email: data.email } });
    if (candidate) {
      throw new Error("Пользователь с таким Email уже существует");
    }
    const hashedPassword = await hashPassword(data.password);
    const user = await User.create({
      ...data,
      password: hashedPassword,
      role: data.role || "user",
      isActive: true,
    });
    return this.omitPassword(user);
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Пользователь не найден");
    if (!user.isActive) throw new Error("Пользователь заблокирован");

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) throw new Error("Неверный пароль");

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "24h" },
    );

    return { user: this.omitPassword(user), token };
  }

  async getAllUsers() {
    return await User.findAll({ attributes: { exclude: ["password"] } });
  }

  async getUserById(id: number) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) throw new Error("Пользователь не найден");
    return user;
  }

  async toggleBlockStatus(id: number, requester: any) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("Пользователь не найден");

    if (requester.role !== "admin" && requester.id !== id) {
      throw new Error("У вас нет прав для этого действия");
    }

    user.isActive = !user.isActive;
    await user.save();
    return this.omitPassword(user);
  }

  private omitPassword(user: User) {
    const { password, ...userWithoutPassword } = user.get();
    return userWithoutPassword;
  }
}

export default new UserService();
