import { Schema, model } from "mongoose";
import { IName } from "../../types-interface/typesInterface";
import { IFaculty, newFacultyModel } from "./faculty.interface";

const facultyNameSchema = new Schema<IName>({
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

const facultySchema = new Schema<IFaculty, newFacultyModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },

    facultyId: {
      type: String,
      required: [true, "faculty Id is required"],
    },

    designation: {
      type: String,
      required: [true, "faculty Designation is required"],
    },

    name: {
      type: facultyNameSchema,
      required: [true, "faculty name is required"],
    },

    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Others"],
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },

    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      ref: "users",
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
facultySchema.statics.isfacultyExist = async function (id: string) {
  const existingfaculty = await FacultyModel.findOne({ id });

  return existingfaculty;
};

//virtual fullName
facultySchema.virtual("fullName").get(function () {
  return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName;
});

export const FacultyModel = model<IFaculty, newFacultyModel>(
  "faculties",
  facultySchema
);
