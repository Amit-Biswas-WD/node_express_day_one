import { model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  UserInstanceMethods,
  UserStaticMethods,
} from "../interfaces/user.interfaces";
import validator from "validator";
import bcrypt from "bcryptjs";
import { Note } from "./notes.models";

export const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Name must be 3 carector {VALUE}"],
      maxlength: 10,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Name must be 3 carector {VALUE}"],
      maxlength: 10,
    },
    age: {
      type: Number,
      required: true,
      min: [18, "AgeMust be at least 20, got {VALUE}"],
      max: 60,
    },
    email: {
      type: String,
      unique: [true, "Email common hoye geche!!"],
      required: [true, "User phone number required"],
      lowercase: true,
      trim: true,
      // validate: {
      //   validator: function (v) {
      //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      //   },
      //   message: function (props) {
      //     return `Email ${props.value} is not valid email`;
      //   },
      // },
      validate: [validator.isEmail, "invalid email {VALUE}"],
    },
    password: { type: String, required: true },
    role: {
      type: String,
      uppercase: true,
      enum: {
        values: ["ADMIN", "USER", "SUPERADMIN"],
        message: "Role is not valid. got {VALUE}",
      },
      default: "USER",
    },
    address: {
      type: addressSchema,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.method("hasPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

userSchema.static("hasPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

//pre hooks
//Document middleware
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Query Middleware
userSchema.pre("find", function (next) {
  console.log("Inside pre find hook");
  next();
});

//Post MiddleWare
//Document MiddleWare
userSchema.post("save", function (doc, next) {
  // console.log("%s has been saved", doc._id);
  console.log(`${doc.email} has been saved`);
  next();
});

//Query MiddleWare
userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    console.log(doc);
    await Note.deleteMany({ user: doc._id });
  }
  next();
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export const User = model<IUser, UserStaticMethods>("User", userSchema);
