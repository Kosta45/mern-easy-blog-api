import { body } from "express-validator";

export const postCreateValidation = [
  body("title", "Enter a text title").isLength({ min: 3 }).isString(),
  body("text", "Enter a text of article").isLength({ min: 3 }).isString(),
  body("tags", "The format of tags is not correct (specify array)")
    .optional()
    .isArray(),
  body("imageUrl", "The image url is not correct").optional().isString(),
];
