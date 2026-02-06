// types/dbTables.ts

export interface Hr_User {
  id?: number;
  email: string;
  password_hash: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export interface Employee {
  id?: number;
  name: string;
  age: number;
  designation: string;
  hiring_date: string; // 'YYYY-MM-DD' format
  date_of_birth: string; // 'YYYY-MM-DD' format
  salary: number; // decimal/numeric
  photo_path?: string | null; // optional
  created_at: Date;
  updated_at: Date;
};

export interface Attendance{
  id?: number;
  employee_id: number;
  date: string; // 'YYYY-MM-DD'
  check_in_time: string; // 'HH:MM:SS' or timestamp
};
