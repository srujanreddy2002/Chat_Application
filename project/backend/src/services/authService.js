const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

exports.generateAuthToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};
