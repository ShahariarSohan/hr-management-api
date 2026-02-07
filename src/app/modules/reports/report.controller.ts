import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { reportService } from "./report.service";

const getMonthlyAttendanceReport = catchAsync(
  async (req: Request, res: Response) => {
    const { month, employee_id } = req.query as {
      month: string;
      employee_id?: string;
    };

    if (!month) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Month query parameter is required (YYYY-MM)",
        data: null,
      });
    }

    const report = await reportService.getMonthlyAttendanceReport(
      month,
      employee_id ? Number(employee_id) : undefined,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Monthly attendance report fetched successfully",
      data: report,
    });
  },
);

export const reportController = {
  getMonthlyAttendanceReport,
};
