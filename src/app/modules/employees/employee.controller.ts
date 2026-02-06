import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { employeeService } from "./employee.service";
import httpStatus from "http-status-codes";
import { Employee } from "../../types/dbTable";


const createEmployee = catchAsync(async (req: Request, res: Response) => {
  const payload: Employee = {
    ...req.body,
    photo_path: req.file?.filename,
  };
  const employee = await employeeService.createEmployee(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Employee created successfully",
    data: employee,
  });
});

const getAllEmployees = catchAsync(async (req: Request, res: Response) => {
  const employees = await employeeService.getAllEmployees();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Employees fetched successfully",
    data: employees,
  });
});

const getEmployeeById = catchAsync(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
  const employee = await employeeService.getEmployeeById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Employee fetched successfully",
    data: employee,
  });
});

const updateEmployee = catchAsync(async (req: Request, res: Response) => {
  const payload: Partial<Employee> = {
    ...req.body,
    ...(req.file && { photo_path: req.file.filename }),
    };
    const id=Number(req.params.id)
  const employee = await employeeService.updateEmployee(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Employee updated successfully",
    data: employee,
  });
});

const deleteEmployee = catchAsync(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
  await employeeService.deleteEmployee(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Employee deleted successfully",
    data: null,
  });
});

export const employeeController = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
