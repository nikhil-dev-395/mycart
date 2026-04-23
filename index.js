import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

// files
import env from "./src/config/env.js";
import logger from "./src/utils/logger.utils.js";
import connectDB from "./src/db/connection.js";
import ApiResponse from "./src/response-handler/api-response.js";
import { authRouter } from "./src/routes/index.js";
import ApiError from "./src/response-handler/api-error.js";
import { isAuth } from "./src/middlewares/auth.middleware.js";
import { cartRouter } from "./src/routes/cart.route.js";
const app = express();

// middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: env.MONGO_URI,
      ttl: 24 * 60 * 60,
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    },
  }),
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/cart", isAuth, cartRouter);

app.get("/", (req, res) => {
  const response = new ApiResponse(200, "server is running...");
  return res.status(response.statusCode).json(response);
});

app.get("/api/me", (req, res) => {
  res.json(req.session.user || null);
});

app.use((err, req, res, next) => {
  logger.error({ err });
  if (!(err instanceof ApiError)) {
    err = new ApiError(500, err.message || "Internal Server Error", [], err);
  }

  logger.error(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    errors: err.errors,
    cause: env.NODE_ENV === "development" ? err.cause : null,
    stack: env.NODE_ENV === "development" ? err.stack : null,
  });
});

const PORT = env.PORT;
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    logger.info(`server is listening on PORT : ${PORT}`);
  });
})();
