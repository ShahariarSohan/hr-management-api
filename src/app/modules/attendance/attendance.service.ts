import db from "../../../db/knex";
import { Attendance, Employee } from "../../types/dbTable";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

interface AttendanceFilters {
  employee_id?: number;
  from?: string;
  to?: string;
}

const createOrUpsertAttendance = async (
  payload: Pick<Attendance, "employee_id" | "date" | "check_in_time">,
): Promise<Attendance> => {

  const employeeExists = await db<Employee>("employees")
    .where({ id: payload.employee_id })
    .first();

  if (!employeeExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Employee not found");
  }


  const [attendance] = await db<Attendance>("attendance")
    .insert(payload)
    .onConflict(["employee_id", "date"])
    .merge({
      check_in_time: payload.check_in_time,
    })
    .returning("*");

  return attendance;
};

const getAllAttendance = async (
  filters: AttendanceFilters,
): Promise<Attendance[]> => {
  const query = db<Attendance>("attendance");
//this is
  if (filters.employee_id) {
    query.where("employee_id", filters.employee_id);
  }

  if (filters.from && filters.to) {
    query.whereBetween("date", [filters.from, filters.to]);
  }

  return await query.orderBy("date", "desc");
};

const getAttendanceById = async (id: number): Promise<Attendance> => {
  const attendance = await db<Attendance>("attendance").where({ id }).first();

  if (!attendance) {
    throw new AppError(httpStatus.NOT_FOUND, "Attendance not found");
  }

  return attendance;
};

const updateAttendance = async (
  id: number,
  payload: Partial<Attendance>,
): Promise<Attendance> => {
  const [attendance] = await db<Attendance>("attendance")
    .where({ id })
    .update(payload)
    .returning("*");

  if (!attendance) {
    throw new AppError(httpStatus.NOT_FOUND, "Attendance not found");
  }

  return attendance;
};

const deleteAttendance = async (id: number): Promise<void> => {
  const deletedRows = await db("attendance").where({ id }).del();

  if (!deletedRows) {
    throw new AppError(httpStatus.NOT_FOUND, "Attendance not found");
  }
};

export const attendanceService = {
  createOrUpsertAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
