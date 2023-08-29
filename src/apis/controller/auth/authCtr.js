const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/userMgt/userModel"); // Update the path to your user model
require("dotenv").config();
const secretKey = process.env.KEY || 'default-secret'; // Use a default value as a fallback

const authController = {
  register: async (req, res) => {
    try {
        const user = new User(req.body);
      
        const emailValidation = await User.findOne({ email: user.email });
        if (emailValidation) {
          return res.status(409).json({ message: 'Username already exists' });
        }
      
        const token = await user.generateToken({ expiresIn: "24h" });
        console.log("Generated token: " + token);
      
        res.cookie("jwt", token);
      
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        // Check if the error is due to a duplicate key (phone) conflict
        if (error.code === 11000 && error.keyPattern && error.keyPattern.phone === 1) {
          res.status(409).json({ message: 'Phone number is already registered' });
        } else {
          res.status(400).send(error);
        }
      }
      
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("login page" + isPasswordValid);

    if (isPasswordValid) {

      const accessToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '24h' });
        // const token = await user.generateToken({ expiresIn: "24h" });
        return res.status(200).json({ message: 'Login successful!', accessToken , user: email });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
  logOut : async (req , res) => {
    try {
        req.user.tokens = [];
        res.clearCookie('jwt');
        await req.user.save();
        res.status(201).json({ message: 'User Logout successfully' });
      } catch (error) {
        res.status(500).send(error);
      }
  },

  getUserProfile: async (req, res) => {
    try {
      res.json(req.user); // req.user is populated by middleware in which we will check is user is found or note any confusion connect to vikash 
    } catch (error) {
      res.status(500).json({ message: "Error fetching user profile." });
    }
  },
};

module.exports = authController;
