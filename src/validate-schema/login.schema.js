import joi from "joi";

const loginSchema = joi.object({
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
      "string.empty": "name is required",
      "string.min": "name must be more than 4 character",
    }),
});

export { loginSchema };
