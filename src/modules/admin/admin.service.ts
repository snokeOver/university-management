//This is the business logic

import { QueryBuilder } from "../../builder/QueryBuilder";
import { UserModel } from "../user/user.model";
import { adminSearchFields } from "./admin.constant";
import { IAdmin } from "./admin.interface";
import { AdminModel } from "./admin.model";

// Get all admin data
export const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(AdminModel.find(), query)
    .search(adminSearchFields)
    .filter()
    .sort()
    .paginate()
    .selectFields();

  const result = await adminQuery.queryModel;

  return result;
};

// Get single admin data
export const getSingleAdminFromDB = async (adminId: string) => {
  const result = await AdminModel.findById(adminId);

  return result;
};

// Update single admin data by admin id
export const updateSingleAadminIntoDB = async (
  adminId: string,
  payload: Partial<IAdmin>
) => {
  const { name, ...restadminData } = payload;

  const dataToSave: Record<string, unknown> = { ...restadminData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      dataToSave[`name.${key}`] = value;
    }
  }

  const result = await AdminModel.findByIdAndUpdate(adminId, dataToSave, {
    new: true,
  });

  return result;
};

// Delete single admin data by admin id
export const deleteSingleAadminFromDB = async (adminId: string) => {
  const result = await UserModel.findByIdAndUpdate(
    adminId,
    { isDeleted: true },
    {
      new: true,
    }
  );

  return result;
};
