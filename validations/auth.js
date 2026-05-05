import { body } from "express-validator";

export const reqisterValidation = [
  body("email", "The email is incorrect").isEmail(),
  body("password", "The minimun password lenght  is 5 sumbols").isLength({
    min: 5,
  }),
  body("fullName", "Enter a name").isLength({ min: 2 }),
  body("avatarUrl", "The url is incorrect").optional().isURL(),
];
