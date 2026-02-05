import type { Knex } from "knex";

import path from "path";
import { envVariables } from "./app/config/env";

const knexConfig: Record<string, Knex.Config> = {
  development: {
    client: "pg",
    connection: envVariables.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "db/migrations"),
      extension: "ts",
    },
    seeds: {
      directory: path.join(__dirname, "db/seeds"),
      extension: "ts",
    },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: envVariables.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: { min: 3, max: 20 },
    migrations: {
      directory: path.join(__dirname, "db/migrations"),
    },
  },
};

export default knexConfig;
