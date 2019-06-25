class Response {
  static error(res, code, message) {
    return res.status(code).json({
      status: code,
      message,
    });
  }

  static success(res, code, data) {
    return res.status(code).json({
      status: code,
      data,
    });
  }
}

export default Response;
