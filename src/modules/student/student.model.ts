import { Schema, model } from "mongoose";
import {
  IGuardian,
  IName,
  IStudent,
  newStudentModel,
} from "./student.interface";

const studentNameSchema = new Schema<IName>({
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

const studentGuardianSchema = new Schema<IGuardian>({
  guardianName: {
    type: String,
    required: [true, "Guardian's name is required"],
  },

  guardianContactNo: {
    type: String,
    required: [true, "Guardian's contact number is required"],
  },

  guardianOccupation: {
    type: String,
    required: [true, "Guardian's occupation is required"],
  },

  relation: {
    type: String,
    required: [true, "Relation is required"],
  },
});

const studentSchema = new Schema<IStudent, newStudentModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    studentId: {
      type: String,
      required: [true, "Student Id is required"],
    },

    name: {
      type: studentNameSchema,
      required: [true, "Student name is required"],
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

    guardian: {
      type: studentGuardianSchema,
      required: [true, "Guardian information is required"],
    },

    profileImage: {
      type: String,
    },

    academicSemister: {
      type: Schema.Types.ObjectId,
      ref: "academicsemisters",
    },

    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "academicdepartments",
    },
  },
  {
    timestamps: true,
    strict: "throw", // prevents extra fields and throw error
    toJSON: { virtuals: true },
  }
);

/*
//custom instance method
studentSchema.methods.isStudentExist = async function (id: string) {
  const existingStudent = await StudentModel.findOne({ id });
  return existingStudent;
};
*/
//static method
studentSchema.statics.isStudentExist = async function (id: string) {
  const existingStudent = await StudentModel.findOne({ id });

  return existingStudent;
};

//virtual fullName
studentSchema.virtual("fullName").get(function () {
  return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName;
});

export const StudentModel = model<IStudent, newStudentModel>(
  "students",
  studentSchema
);
