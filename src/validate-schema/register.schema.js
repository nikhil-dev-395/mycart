import joi from "joi";

const registerSchema = joi.object({
  name: joi.string().min(4).required().messages({
    "string.empty": "name is required",
    "string.min": "name must be more than 4 character",
  }),
  email: joi.string().min(4).email().required().messages({
    "string.empty": "email is required",
    "string.min": "email must be more than 4 character",
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

export { registerSchema };
