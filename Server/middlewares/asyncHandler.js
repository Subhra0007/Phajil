// middleware/asyncHandler.js

// This wrapper lets you use async/await in route handlers
// without needing try/catch in every controller.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
