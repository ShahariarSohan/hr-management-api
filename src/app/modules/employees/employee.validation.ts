import { z } from "zod";

export const createEmployeeZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().int().min(18, "Age must be at least 18"),
  designation: z.string().min(1, "Designation is required"),
  hiring_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Hiring date must be in YYYY-MM-DD format",
  }),
  date_of_birth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Date of birth must be in YYYY-MM-DD format",
  }),
  salary: z.number().min(0, "Salary must be positive"),
});

export const updateEmployeeZodSchema = createEmployeeZodSchema.partial();
