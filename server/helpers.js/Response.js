class Response {
  static success(res, code, payload, message) {
    return res.status(code).json({
      status: code,
      message,
      payload
    });
  }
  static error(res, code, message) {
    return res.status(code).json({
      status: code,
      error: message
    });
  }
}

export default Response;
