import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2, "Имя слишком короткое"),
  lastName: z.string().min(2, "Фамилия слишком короткая"),
  middleName: z.string().optional(),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Некорректный формат даты",
  }),
  email: z.string().email("Некорректный формат Email"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
  role: z.enum(["admin", "user"]).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Некорректный формат Email"),
  password: z.string().min(1, "Пароль обязателен"),
});

export type RegisterDTO = z.infer<typeof registerSchema>;
export type LoginDTO = z.infer<typeof loginSchema>;
