import { Router } from "express";
import { reportController } from "./report.controller";
import authGuard from "../../middlewares/authGuard";
import { Role } from "../../types/userRole";

const router = Router();

// GET /reports/attendance?month=YYYY-MM&employee_id=optional
router.get(
  "/attendance",
  authGuard(Role.HR_ADMIN),
  reportController.getMonthlyAttendanceReport,
);

export const reportRoutes = router;
