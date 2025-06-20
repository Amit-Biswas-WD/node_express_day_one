import express, { Request, Response } from "express";
import { User } from "../models/user.interfaces";
import { z } from "zod";
// import bcrypt from "bcryptjs";

export const usersRoutes = express.Router();

const createUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    // const zodBody = await createUserZodSchema.parseAsync(req.body);
    const body = req.body;

    // const password = await bcrypt.hash(body.password, 10);
    // console.log(password);
    // body.password = password;

    // build it and custom instant method
    // const user = new User(body);
    // const password = await user.hasPassword(body.password);
    // console.log(password);
    // user.password = password;
    // await user.save();

    // build in and custom static method
    // const password = await User.hasPassword(body.password);
    // console.log(password, "static");
    // body.password = password;

    const user = await User.create(body);

    res.status(201).json({
      success: true,
      message: "User create successfully!!",
      user,
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

usersRoutes.get("/", async (req: Request, res: Response) => {
  const userEmail = req.query.email ? req.query.email : "";
  console.log(userEmail);
  let users = [];

  //filtering
  if (userEmail) {
    users = await User.find({ email: userEmail });
  } else {
    users = await User.find();
  }

  //sorting
  //ascending
  // users = await User.find().sort({email: "asc"})
  //
  // users = await User.find().sort({ email: "ascending" });

  //descending
  // users = await User.find().sort({ email: "desc" });
  //
  // users = await User.find().sort({email: "descending"})

  //ascending
  // users = await User.find().sort({ email: 1 });
  // descending
  // users = await User.find().sort({email: -1})

  //skiping
  // users = await User.find().skip(10);
  //limiting
  // users = await User.find().limit(2)

  res.status(201).json({
    success: true,
    message: "User readRide successfully!!",
    users,
  });
});

usersRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const users = await User.findById(userId);

  res.status(201).json({
    success: true,
    message: "User readRide single Id successfully!!",
    users,
  });
});

usersRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedBody = req.body;
  const users = await User.findByIdAndUpdate(userId, updatedBody, {
    new: true,
  });

  res.status(201).json({
    success: true,
    message: "User update successfully!!",
    users,
  });
});

usersRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  // const users = await User.findByIdAndDelete(userId);
  const users = await User.findOneAndDelete({ _id: userId });

  res.status(201).json({
    success: true,
    message: "User delete successfully!!",
    users,
  });
});
