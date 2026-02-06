import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

interface EnvConfig {
  PORT: number;
  NODE_ENV: string;
  DATABASE_URL: string;
  BCRYPT_SALT_ROUND: number;
  UPLOAD_PATH: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRES_IN: string;
  REFRESH_TOKEN_EXPIRES_IN: string;
}

const loadEnvVariables = (): EnvConfig => {
  const required = ["DATABASE_URL", "PORT"];

  required.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`[Config Error]: Missing env variable ${key}`);
    }
  });

  return {
    PORT: Number(process.env.PORT),
    NODE_ENV: process.env.NODE_ENV as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    BCRYPT_SALT_ROUND: Number(process.env.BCRYPT_SALT_ROUND),
    UPLOAD_PATH: process.env.UPLOAD_PATH as string,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  } as EnvConfig;
};

export const envVariables = loadEnvVariables();
