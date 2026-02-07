import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { attendanceService } from "./attendance.service";


const createAttendance = catchAsync(async (req: Request, res: Response) => {
  const attendance = await attendanceService.createOrUpsertAttendance(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Attendance recorded successfully",
    data: attendance,
  });
});

const getAllAttendance = catchAsync(async (req: Request, res: Response) => {
  const attendance = await attendanceService.getAllAttendance({
    employee_id: req.query.employee_id
      ? Number(req.query.employee_id)
      : undefined,
    from: req.query.from as string,
    to: req.query.to as string,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attendance fetched successfully",
    data: attendance,
  });
});

const getAttendanceById = catchAsync(async (req: Request, res: Response) => {
  const attendance = await attendanceService.getAttendanceById(
    Number(req.params.id),
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
      success: true,
    message:"Attendance fetched successfully",
    data: attendance,
  });
});

const updateAttendance = catchAsync(async (req: Request, res: Response) => {
  const attendance = await attendanceService.updateAttendance(
    Number(req.params.id),
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attendance updated successfully",
    data: attendance,
  });
});

const deleteAttendance = catchAsync(async (req: Request, res: Response) => {
  await attendanceService.deleteAttendance(Number(req.params.id));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attendance deleted successfully",
    data: null,
  });
});

export const attendanceController = {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
