import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import { saltRound } from "../..";
import bcrypt from "bcrypt";

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
  this.password = await bcrypt.hash(this.password, Number(saltRound));
});

//post save middleware to hide password
userSchema.post("save", function () {
  this.password = "";
});

export const UserModel = model<IUser>("users", userSchema);
