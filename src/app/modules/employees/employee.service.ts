
import fs from 'fs';
import db from "../../../db/knex";
import { Employee } from "../../types/dbTable";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { envVariables } from "../../../config/env";
import path from 'path';



const createEmployee = async (payload: Employee): Promise<Employee> => {
  const [employee] = await db<Employee>("employees")
    .insert(payload)
    .returning("*");
    return employee;
};

const getAllEmployees = async (): Promise<Employee[]> => {
  return await db<Employee>("employees").select("*");
};

const getEmployeeById = async (id: number): Promise<Employee> => {
  const employee = await db<Employee>("employees").where({ id }).first();
  if (!employee) throw new AppError(httpStatus.NOT_FOUND, "Employee not found");
  return employee;
};

const updateEmployee = async (id: number, payload: Partial<Employee>): Promise<Employee> => {
  
    const currentEmployee = await db<Employee>("employees").where({ id }).first();
    if (!currentEmployee) throw new AppError(httpStatus.NOT_FOUND, "Employee not found");


    if (payload.photo_path && currentEmployee.photo_path) {
        const oldPhotoPath = path.join(process.cwd(), "src", envVariables.UPLOAD_PATH, currentEmployee.photo_path);
        if (fs.existsSync(oldPhotoPath)) {
            fs.unlinkSync(oldPhotoPath);
        }
    }

    const [employee] = await db<Employee>("employees")
        .where({ id })
        .update({ ...payload, updated_at: new Date() })
        .returning("*");

    return employee;
}
const deleteEmployee = async (id: number): Promise<void> => {
  const deleted = await db<Employee>("employees").where({ id }).del();
  if (!deleted) throw new AppError(httpStatus.NOT_FOUND, "Employee not found");
};

export const employeeService = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
