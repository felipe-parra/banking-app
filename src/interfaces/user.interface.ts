import z from "zod";

export const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
  accounts: z.array(z.string()).optional(),
});

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export type UserType = z.infer<typeof registerFormSchema>;
