import dotenv from "dotenv";
import path from "path";


dotenv.config({ path: path.join(__dirname, "../../../.env") });

interface EnvConfig {
  PORT: number; 
  NODE_ENV: string;
  DATABASE_URL: string;
  
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
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL as string,
 
  } as EnvConfig;
};

export const envVariables = loadEnvVariables();
