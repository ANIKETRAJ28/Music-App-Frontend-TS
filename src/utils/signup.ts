import { z } from "zod";

export const EmailValidator = z
  .string()
  .email({ message: "Invalid email address" })
  .nonempty({ message: "Email is required" });

export const OtpValidator = z
  .string()
  .length(6, { message: "OTP must be exactly 6 characters long" });

export const ProfileValidator = z.object({
  username: z
    .string()
    .nonempty({ message: "Username is required" })
    .regex(/^[a-zA-Z0-9_]*$/, {
      message: "Username can only contain letters, numbers, and underscores",
    })
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(10, { message: "Username must be at most 10 characters long" }),
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .regex(/^[a-zA-Z0-9_]* ?[a-zA-Z0-9_]*$/, {
      message:
        "Name can only contain letters, numbers, underscores, and a single space",
    })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(15, { message: "Name must be at most 15 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
