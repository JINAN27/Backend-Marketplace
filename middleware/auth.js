const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('Authorization');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'Tidak ada token, otorisasi ditolak' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token tidak valid' });
  }
};

