
import httpStatus from "http-status-codes";
import bcrypt from "bcrypt";

import { jwtHelpers } from "../../utils/jwtHelpers";

import { Secret } from "jsonwebtoken";

import AppError from "../../errorHelpers/AppError";
import { envVariables } from "../../../config/env";
import db from "../../../db/knex";
import { Role } from "../../types/userRole";
import { Hr_User } from "../../types/dbTable";


const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await db<Hr_User>("hr_users")
    .where({ email: payload.email })
    .first();
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid user or email");
  }
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password_hash
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password!");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      id:userData.id,
      email: userData.email,
      role: Role.HR_ADMIN,
    },
    envVariables.ACCESS_TOKEN_SECRET as Secret,
    envVariables.ACCESS_TOKEN_EXPIRES_IN as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      id:userData.id,
      email: userData.email,
      role: Role.HR_ADMIN,
    },
    envVariables.REFRESH_TOKEN_SECRET as Secret,
    envVariables.REFRESH_TOKEN_EXPIRES_IN as string
  );

  return {
    accessToken,
    refreshToken,
  };
};


export const authService = {
  loginUser
};
