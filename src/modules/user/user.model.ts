import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import { saltRound } from "../..";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/error.class";

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    needPasswordChange: {
      type: Boolean,
      default: true,
    },

    role: {
      type: String,
      enum: {
        values: ["Admin", "Student", "Faculty"],
      },
      required: true,
    },

    status: {
      type: String,
      enum: {
        values: ["Active", "InActive"],
      },
      default: "Active",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: "throw", // prevents extra fields and throw error
  }
);

//Pre save middleware: will work on create() and save() to encrypt password
userSchema.pre("save", async function () {
  const isUserExist = await UserModel.findOne({
    email: this.email,
  });

  if (isUserExist)
    throw new AppError(409, "Duplicate Email", "This User is already exist !");

  this.password = await bcrypt.hash(this.password, Number(saltRound));
});

//To check if the user id exist or not before delete
userSchema.pre("findOneAndUpdate", async function () {
  const isUserExist = await UserModel.findOne(this.getQuery());
  if (!isUserExist) {
    throw new AppError(
      404,
      "User Not Found",
      "The user you are trying to update does not exist!"
    );
  }
});

//post save middleware to hide password
userSchema.post("save", function () {
  this.password = "";
});

export const UserModel = model<IUser>("users", userSchema);
