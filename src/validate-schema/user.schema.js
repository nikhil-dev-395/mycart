import joi from "joi";

export const userSchema = joi.object({
  productName: joi.string().min(4).required().messages({
    "string.empty": "name is required",
    "string.min": "name must be more than 4 character",
  }),
  email: joi.string().min(4).email().required().messages({
    "string.empty": "name is required",
    "string.min": "name must be more than 4 character",
  }),
  password: joi
    .string()
    .min(4)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.empty": "password is required",
      "string.min": "password must be more than 4 character",
    }),
});

export const getUserSchema = joi.object({
  email: joi.string().min(4).email().required().messages({
    "string.empty": "name is required",
    "string.min": "name must be more than 4 character",
  }),
});

export const updateUserSchema = joi.object({
  name: joi.string().min(4).messages({
    "string.min": "name must be more than 4 character",
  }),
  email: joi.string().min(4).email(),
  password: joi.string().min(4).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  status: joi.string(),
  role: joi.string().default("active"),
});
