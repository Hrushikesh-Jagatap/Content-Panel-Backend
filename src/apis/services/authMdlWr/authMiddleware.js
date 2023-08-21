const jwt = require("jsonwebtoken");
const User = require("../../model/userMgt/userModel"); 
require("dotenv").config();

const authMiddleware = {
  authenticate: async (req, res, next) => {
    try {
      const token = req.cookies.jwt; // the token in a cookie named "jwt"
      if (!token) {
        return res.status(401).json({ message: "Authentication failed: No token provided." });
      }

      const decodedToken = jwt.verify(token, process.env.KEY);
      const user = await User.findOne({
        _id: decodedToken._id,
        "tokens.token": token,
      });

      if (!user) {
        return res.status(401).json({ message: "Authentication failed: User not found." });
      }

      req.token = token; // Pass the token along in the request for later use
      req.user = user;   // Pass the authenticated user object along in the request

      next(); // Continue to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: "Authentication failed: Invalid token." });
    }
  },
};

module.exports = authMiddleware;
