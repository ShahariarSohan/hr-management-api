import knex from "knex";
import { envVariables } from "../config/env";
import knexConfig from "../knexfile";

const db = knex(knexConfig[envVariables.NODE_ENV]);

export default db;
