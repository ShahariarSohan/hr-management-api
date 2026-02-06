import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

  await knex("employees").del();

  await knex("employees").insert([
    {
      name: "Shahariar Sohan",
      age: 25,
      designation: "Lead MERN Developer",
      hiring_date: "2023-01-15",
      date_of_birth: "1998-05-20",
      salary: 95000.0,
      photo_path: null,
    },
    {
      name: "Someone",
      age: 30,
      designation: "HR Manager",
      hiring_date: "2022-06-01",
      date_of_birth: "1994-11-10",
      salary: 75000.0,
      photo_path: null,
    },
  ]);

  console.log("✅ Employees seeded successfully");
}
