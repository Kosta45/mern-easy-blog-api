import { body } from "express-validator";

export const loginValidation = [
  body("email", "The email is incorrect").isEmail(),
  body("password", "The minimun password lenght  is 5 sumbols").isLength({
    min: 5,
  }),
];
