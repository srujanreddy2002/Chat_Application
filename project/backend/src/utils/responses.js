exports.successResponse = (res, message, data = null) => {
    res.status(200).json({ success: true, message, data });
  };
  
  exports.createdResponse = (res, message, data = null) => {
    res.status(201).json({ success: true, message, data });
  };
  
  exports.errorResponse = (res, status, message) => {
    res.status(status).json({ success: false, error: message });
  };
  