import { Router } from "express";
import { attendanceController } from "./attendance.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createAttendanceZodSchema,
  updateAttendanceZodSchema,
} from "./attendance.validation";
import authGuard from "../../middlewares/authGuard";
import { Role } from "../../types/userRole";

const router = Router();

router.use(authGuard(Role.HR_ADMIN));

router.post(
  "/",
  validateRequest(createAttendanceZodSchema),
  attendanceController.createAttendance,
);

router.get("/", attendanceController.getAllAttendance);

router.get("/:id", attendanceController.getAttendanceById);

router.put(
  "/:id",
  validateRequest(updateAttendanceZodSchema),
  attendanceController.updateAttendance,
);

router.delete("/:id", attendanceController.deleteAttendance);

export const attendanceRoutes = router;
