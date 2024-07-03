export const errorHandlerMiddleware = (error, req, res, next) => {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      date: {
        message: error.message,
      },
});
  };
