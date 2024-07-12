const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
try {
  const {token} = req.cookies
  if (!token) {
    return res.status(401).json({ success: false, message: 'Please Login First' });
  }
  
  const decoded = await jwt.verify(token, process.env.TOKKENSECRET)
 
  const user = await User.findById(decoded._id)
  req.user = user
    next();
} catch (error) {
  return res.status(500).send({ success: false, message: error.message });
  
}
};

module.exports = verifyToken;
