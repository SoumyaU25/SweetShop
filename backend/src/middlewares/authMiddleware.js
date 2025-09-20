const jwt = require('jsonwebtoken');
const User = require('../model/User');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  const token = authHeader.split(' ')[1];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
   try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //ataching user to request
        req.user = await User.findById(decoded.id).select('-password');
    next();  //moving to next route
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

//at this point we sill get user data in req.user so verifying for admin
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};

module.exports = { protect, adminOnly };
 