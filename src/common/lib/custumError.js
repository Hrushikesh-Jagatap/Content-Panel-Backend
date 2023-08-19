
class BaseError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  
    handleError(req, res) {
      res.status(this.statusCode).json({ error: this.message });
    }
  }
  
  class INTERNAL_SERVER_ERROR extends BaseError {
    constructor() {
      super('Internal server error', 500);
    }
  }
  
  module.exports = {
    BaseError,
    INTERNAL_SERVER_ERROR,
  };
  