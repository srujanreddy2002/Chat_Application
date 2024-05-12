const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    req.userId = decoded.userId;
    next();
  });
};
