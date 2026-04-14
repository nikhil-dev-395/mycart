/**
 *  crud operation on users
 *
 * **/
import bcrypt from "bcryptjs";
import { Cart, User } from "../models/index.js";
import ApiResponse from "../response-handler/api-response.js";

import {
  userSchema,
  getUserSchema,
  updateUserSchema,
} from "../validate-schema/index.js";
import ApiError from "../response-handler/api-error.js";
import logger from "../utils/logger.utils.js";
import env from "../config/env.js";

export const addToCart = async (req, res, next) => {
  try {
    // const { error, value } = userSchema.validate(req.body, {
    //   abortEarly: false,
    // });

    // if (error) {
    //   throw new ApiError(
    //     400,
    //     "invalid user details",
    //     error.details.map((err) => err.message),
    //     error,
    //   );
    // }

    const { productName, imageUrl, price, description } = req.body;
    if (!description) {
      throw new ApiError(400, "description not provided");
    }

    if (!productName) {
      throw new ApiError(400, "productName not provided");
    }
    if (!price) {
      throw new ApiError(400, "price not provided");
    }
    if (!imageUrl) {
      throw new ApiError(400, "imageUrl not provided");
    }

    // const user = await User.findOne({ email }).lean();
    // if (user) throw new ApiError(409, "user already exits", [], error);

    // const hashPassword = await bcrypt.hash(password, 10);
    const newCartProduct = new Cart({
      productName,
      imageUrl,
      price,
      description,
    });

    await newCartProduct.save();

    const response = new ApiResponse(
      201,
      "user created successfully",
      newCartProduct,
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

// try - if we got any error here just send it to catch block
// catch- perform operation as provided

export const getUser = async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (!_id) throw new ApiError(400, "_id not provided");

    const user = await User.findOne({ _id }).lean();
    logger.info({ user }, "user found");
    if (!user) throw new ApiError(409, "user not found");
    delete user.password;
    delete user.__v;

    const response = new ApiResponse(200, "user found", user);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (!_id) throw new ApiError(400, "user id not provided");
    const { error, value } = updateUserSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw new ApiError(
        400,
        "invalid data",
        error.details.map((err) => err.message),
        error,
      );
    }
    let { name, email, password, status } = value;
    let hashPassword;
    if (password && password.trim() !== "") {
      hashPassword = await bcrypt.hash(password, 10);
    }

    let user = await User.findOneAndUpdate(
      { _id },
      {
        $set: {
          name,
          email,
          password: hashPassword,
          status,
        },
      },
      { new: true },
    ).lean();
    if (!user) throw new ApiError(409, "user not found", [], error);
    const data = user;
    const response = new ApiResponse(200, "user found", data);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (!_id) throw new ApiError(400, "_id not provided");
    const user = await User.findOne({ _id }).lean();
    if (!user) throw new ApiError(409, "user not found");
    await User.deleteOne({ _id });
    const response = new ApiResponse(200, "user deleted successfully");
    return res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    let { page } = req.params;
    const limit = 5;
    page = Number(page);
    let skip = (page - 1) * limit;
    // const count = await User.countDocuments();
    // if (count === 0) {
    //   throw new ApiError(404, "no users present in db");
    // }
    const cartProducts = await Cart.find({}).skip(skip).limit(limit).lean();
    logger.info(cartProducts.length, "cartProducts found");
    if (!cartProducts.length) throw new ApiError(409, "user not found");

    const response = new ApiResponse(200, "cartProducts found", cartProducts);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
