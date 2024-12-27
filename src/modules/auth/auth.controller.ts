import { nodeEnv } from "../..";
import { catchAsync } from "../../utils/catchAsync";
import { changePasswordIntoDB, loginUserFromDB } from "./auth.service";

export const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserFromDB(req.body);
  const { accessToken, needPassChange, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: nodeEnv !== "development",
    httpOnly: true,
  });

  res.status(200).send({
    success: true,
    message: "Loin success!",
    data: {
      accessToken,
      needPassChange,
    },
  });
});

export const changePassword = catchAsync(async (req, res) => {
  const result = await changePasswordIntoDB(req.body, req.user);

  res.status(200).send({
    success: true,
    message: "Password Updated successfully!",
    data: result,
  });
});
