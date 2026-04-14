class ApiError extends Error {
  constructor(statusCode, message, errors = [], cause = null, stack = null) {
    super(message, { cause });
    this.status = "failed";
    this.statusCode = statusCode;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
