const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/userMgt/userModel"); // Update the path to your user model
require("dotenv").config();

const authController = {
  register: async (req, res) => {
    try {
      const { email, phone, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists." });
      }

      const newUser = new User({
        email,
        phone,
        password,
      });

      await newUser.save();
      const token = await newUser.generateToken();
      res.cookie("jwt",token);

      res.status(201).json({ token });
    } catch (error) {
        // Check if the error is due to a duplicate key (phone) conflict
        if (error.code === 11000 && error.keyPattern && error.keyPattern.phone === 1) {
          res.status(409).json({ message: 'Phone number is already registered' });
        } else {
            res.status(500).json({ message: "Registration failed." });
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
        const token = await user.generateToken();
        return res.status(200).json({ message: 'Login successful!', token , user: email });
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
      res.json(req.user); // req.user is populated by middleware
    } catch (error) {
      res.status(500).json({ message: "Error fetching user profile." });
    }
  },
};

module.exports = authController;
