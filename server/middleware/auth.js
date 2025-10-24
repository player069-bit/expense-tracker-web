const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1. Get the token from the header
  // The header looks like: "Authorization: Bearer <token>"
  const authHeader = req.header('Authorization');

  // 2. Check if no token is present
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Check if it's a Bearer token
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ msg: 'Token format is incorrect, authorization denied' });
  }

  try {
    // 3. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. If valid, add the user's ID to the request object
    req.user = decoded; // The payload we set was { id: userId }

    // 5. Call the next piece of middleware or the route handler
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;