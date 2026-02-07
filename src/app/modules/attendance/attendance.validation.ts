import { z } from "zod";

export const createAttendanceZodSchema = z.object({
  employee_id: z.number({ message: "Employee ID is required" }),
  date: z.string({
    message: "Date is required",
  }),
  check_in_time: z.string({
    message: "Check-in time is required",
  }),
});

export const updateAttendanceZodSchema = z.object({
  employee_id: z.number().optional(),
  date: z.string().optional(),
  check_in_time: z.string().optional(),
});
