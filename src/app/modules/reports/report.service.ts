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
  // 1️⃣ Calculate month start and end
  const [year, mon] = month.split("-").map(Number);
  const startDate = new Date(year, mon - 1, 1);
  const endDate = new Date(year, mon, 0);

  const startDateStr = startDate.toISOString().slice(0, 10);
  const endDateStr = endDate.toISOString().slice(0, 10);

  // 2️⃣ Execute SQL
  const result = await db.raw<MonthlyAttendanceReport[]>(
    `
    SELECT
      e.id AS employee_id,
      e.name,
      COUNT(a.date)::int AS days_present,
      COALESCE(
        SUM(
          CASE
            WHEN a.check_in_time::time > '09:45:00' THEN 1
            ELSE 0
          END
        ), 0
      )::int AS times_late
    FROM employees e
    LEFT JOIN attendance a
      ON e.id = a.employee_id
     AND a.date >= :start_date
     AND a.date <= :end_date
    WHERE (:employee_id::int IS NULL OR e.id = :employee_id)
    GROUP BY e.id, e.name
    ORDER BY e.name
    `,
    {
      start_date: startDateStr,
      end_date: endDateStr,
      employee_id: employee_id ?? null,
    },
  );

  // 3️⃣ Return array matching interface
  return result.rows;
};

export const reportService = {
  getMonthlyAttendanceReport,
};
