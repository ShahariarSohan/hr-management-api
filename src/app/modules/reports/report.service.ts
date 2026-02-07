import db from "../../../db/knex";


interface MonthlyAttendanceReport {
  employee_id: number;
  name: string;
  days_present: number;
  times_late: number;
}

const getMonthlyAttendanceReport = async (
  month: string,
  employee_id?: number,
): Promise<MonthlyAttendanceReport[]> => {
  // 1️⃣ Determine start and end date of the month
  const startDate = `${month}-01`;
  const endDate = `${month}-31`; // Simple approach; DB will ignore non-existent dates

  // 2️⃣ Build query
  const query = db("employees as e")
    .leftJoin("attendance as a", function () {
      this.on("e.id", "=", "a.employee_id")
        .andOn("a.date", ">=", db.raw("?", [startDate]))
        .andOn("a.date", "<=", db.raw("?", [endDate]));
    })
    .modify((qb) => {
      if (employee_id) {
        qb.where("e.id", employee_id);
      }
    })
    .groupBy("e.id", "e.name")
    .select(
      "e.id as employee_id",
      "e.name",
      db.raw("COUNT(a.date) as days_present"),
      db.raw(`
        SUM(
          CASE
            WHEN a.check_in_time::time > '09:45:00' THEN 1
            ELSE 0
          END
        ) as times_late
      `),
    );

  const report: MonthlyAttendanceReport[] = await query;

  return report;
};

export const reportService = {
  getMonthlyAttendanceReport,
};
