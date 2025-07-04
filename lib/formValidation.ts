import { z } from "zod";

export const step1Schema = z
  .object({
    fullName: z.string().min(3, "حداقل ۳ کاراکتر لازم است."),
    email: z.string().email("ایمیل نامعتبر است.").optional(),
    phone: z
      .string()
      .regex(/^09\d{9}$/, "شماره موبایل باید با 09 شروع شده و ۱۱ رقم باشد.")
      .optional(),
    birthday: z.string(), // ✅ remove the age check here
  })
  .refine((data) => data.email?.trim() !== "" || data.phone?.trim() !== "", {
  message: "حداقل یکی از ایمیل یا شماره موبایل باید وارد شود.",
  path: ["email"], 
  });
export const step2Schema = z.object({
  skills: z.array(z.string().min(1)).min(1, "حداقل یک مهارت باید وارد شود."),
});
