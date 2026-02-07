import { Knex } from "knex";
import bcrypt from "bcrypt";
import { envVariables } from "../../config/env";

export async function seed(knex: Knex): Promise<void> {
  await knex("hr_users").del();

  const hashedPassword = await bcrypt.hash(
    "hrAdmin1",
    Number(envVariables.BCRYPT_SALT_ROUND),
  );

  await knex("hr_users").insert([
    {
      email: "hrAdmin1@company.com",
      password_hash: hashedPassword,
      name: "System Administrator1",
    },
    {
      email: "hrAdmin2@company.com",
      password_hash: hashedPassword,
      name: "System Administrator2",
    },
  ]);

  console.log("✅ HR Admin seeded: hrAdmin1@company.com / hrAdmin1");
  console.log("✅ HR Admin seeded: hrAdmin2@company.com / hrAdmin1");
}
