import { catchAsync } from "../../utils/catchAsync";
import { changePasswordIntoDB, loginUserFromDB } from "./auth.service";

export const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserFromDB(req.body);

  res.status(200).send({
    success: true,
    message: "Loin success!",
    data: result,
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
