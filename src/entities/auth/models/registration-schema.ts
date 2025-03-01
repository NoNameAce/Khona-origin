import * as z from "zod";

export const registrationSchema = z
  .object({
    userName: z.string().min(2, { message: "Username must be at least 2 characters long" }),
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
    phone: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegistrationSchema = z.infer<typeof registrationSchema>;
