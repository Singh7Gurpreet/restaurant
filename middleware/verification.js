const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  console.log("token",req.cookies);
    const token = (req.cookies.token);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY); // Assuming token is in format 'Bearer your_token'
      req.user = decoded; // Attach user information to the request object
      next();
    } catch (error) {
      return res.status(403).json({ error: 'Forbidden' });
    }
  }

module.exports = {verifyToken};