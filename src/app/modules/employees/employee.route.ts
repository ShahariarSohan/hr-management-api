import { Router } from "express";
import { employeeController } from "./employee.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createEmployeeZodSchema,
  updateEmployeeZodSchema,
} from "./employee.validation";
import { upload } from "../../../config/multer";
import authGuard from "../../middlewares/authGuard";
import { Role } from "../../types/userRole";

const router = Router();

router.use(authGuard(Role.HR_ADMIN));
router.post(
  "/",
  upload.single("file"),
  validateRequest(createEmployeeZodSchema),
  employeeController.createEmployee,
);

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);

router.put(
  "/:id",
  upload.single("file"),
  validateRequest(updateEmployeeZodSchema),
  employeeController.updateEmployee,
);

router.delete("/:id", employeeController.deleteEmployee);

export const employeeRoutes = router;
