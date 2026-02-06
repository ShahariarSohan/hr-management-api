
import httpStatus from 'http-status-codes';


import catchAsync from "../../shared/catchAsync";
import { authService } from "./auth.service";
import { Request, Response } from "express";

import sendResponse from "../../shared/sendResponse";

import { parseExpiryToken } from "../../shared/parseExpiryToken";
import { envVariables } from "../../../config/env";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const accessTokenMaxAge = parseExpiryToken(
    envVariables.ACCESS_TOKEN_EXPIRES_IN as string,
    1000 * 60 * 60
  );
  const refreshTokenMaxAge = parseExpiryToken(
    envVariables.REFRESH_TOKEN_EXPIRES_IN as string,
    1000 * 60 * 60 * 24 * 30
  );

  const result = await authService.loginUser(req.body);
  const { refreshToken, accessToken } = result;
  res.cookie("accessToken", accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: accessTokenMaxAge,
  });
  res.cookie("refreshToken", refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: refreshTokenMaxAge,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged in successfully!",
    data: {
      accessToken,
      refreshToken,
    },
  });
});
const logoutUser = catchAsync(async (req: Request, res: Response) => {
 
  res.clearCookie("accessToken", {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });

  res.clearCookie("refreshToken", {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged out successfully!",
    data: null,
  });
})

export const authController = {
  loginUser,logoutUser
};
