// authenticateAdmin.js
const jwt = require('jsonwebtoken');

// Middleware to authenticate admin using JWT
const authenticateAdmin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header (Bearer token)

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with secret
    req.admin = decoded; // Add admin data to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = { authenticateAdmin };
