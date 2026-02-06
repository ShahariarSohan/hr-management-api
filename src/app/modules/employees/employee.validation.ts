import { z } from "zod";

export const createEmployeeZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().int().min(18, "Age must be at least 18"),
  designation: z.string().min(1, "Designation is required"),
  hiring_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid hiring date",
  }),
  date_of_birth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date of birth",
  }),
  salary: z.number().min(0, "Salary must be positive"),
});

export const updateEmployeeZodSchema = createEmployeeZodSchema.partial();
