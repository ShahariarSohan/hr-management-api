import { Knex } from "knex";
import bcrypt from "bcrypt";
import { envVariables } from "../../config/env";

export async function seed(knex: Knex): Promise<void> {
  await knex("hr_users").del();

  const hashedPassword = await bcrypt.hash(
    "hrAdmin123",
    Number(envVariables.BCRYPT_SALT_ROUND),
  );

  await knex("hr_users").insert([
    {
      email: "hrAdmin@company.com",
      password_hash: hashedPassword,
      name: "System Administrator",
    },
  ]);

  console.log("✅ HR Admin seeded: hrAdmin@company.com / hrAdmin123");
}
