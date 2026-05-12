import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import { reqisterValidation } from "./validations/auth.js";
import { loginValidation } from "./validations/login.js";
import { postCreateValidation } from "./validations/post.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";

// import { register, login, getMe } from "./controllers/UserController.js";
// import {
//   create,
//   getAll,
//   getOne,
//   remove,
//   update,
// } from "./controllers/PostController.js";

import { UserController, PostController } from "./controllers/index.js";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login,
);
app.post(
  "/auth/register",
  reqisterValidation,
  handleValidationErrors,
  UserController.register,
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/tags", PostController.getLastTags);

app.get("/posts", PostController.getAll);
app.get("/posts/tags", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, PostController.update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
