/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { employeeRoutes } from "../modules/employees/employee.route";


export const router = Router();
interface IModuleRoutes {
  path: string;
  route: any;
}
const moduleRoutes: IModuleRoutes[] = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/employees",
    route: employeeRoutes,
  },
 
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
