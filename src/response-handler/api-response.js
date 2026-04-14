class ApiResponse {
  constructor(statusCode, message, data) {
    this.status = statusCode < 400 ? "success" : "failed";
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
