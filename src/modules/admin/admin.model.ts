import { Schema, model } from "mongoose";
import { IName } from "../../types-interface/typesInterface";
import { IAdmin, newAdminModel } from "./admin.interface";

const adminNameSchema = new Schema<IName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [20, "First name can't be greater than 20 characters"],
  },

  middleName: {
    type: String,
  },

  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
});

const adminSchema = new Schema<IAdmin, newAdminModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    adminId: {
      type: String,
      required: [true, "admin Id is required"],
    },

    designation: {
      type: String,
      required: [true, "admin Designation is required"],
    },

    name: {
      type: adminNameSchema,
      required: [true, "admin name is required"],
    },

    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Others"],
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },

    dateOfBirth: {
      type: String,
    },

    contactNo: {
      type: String,
      required: [true, "Contact number is required"],
    },

    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
    },

    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "{VALUE} is not a valid blood group",
      },
    },

    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },

    permanetAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },

    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: "throw", // prevents extra fields and throw error
    toJSON: { virtuals: true },
  }
);

//static method
adminSchema.statics.isAdminExist = async function (id: string) {
  const existingAdmin = await AdminModel.findOne({ id });

  return existingAdmin;
};

//virtual fullName
adminSchema.virtual("fullName").get(function () {
  return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName;
});

export const AdminModel = model<IAdmin, newAdminModel>("admins", adminSchema);
