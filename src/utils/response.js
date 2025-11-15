/**
 * Success Response
 * Usage: return success(res, "Message", data)
 */
export const success = (res, message = "Success", data = null, status = 200) => {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  };
  
  /**
   * Fail Response (Use inside controllers only)
   * NOTE: Errors thrown should be handled by errorHandler.js
   */
  export const fail = (res, message = "Failed", error = null, status = 400) => {
    return res.status(status).json({
      success: false,
      message,
      error,
    });
  };
  