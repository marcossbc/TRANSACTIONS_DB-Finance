// notFound.js
export const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: `not found - ${req.originalUrl}`, status: 404 });
};

// handle.js
export const handle = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error",
    status: err.status || 500
  });
  next()
};