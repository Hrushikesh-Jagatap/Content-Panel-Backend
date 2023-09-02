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
          return res.status(409).json({ message: 'User email already exists' });
        }
        const phoneValidation = await User.findOne({ phone: user.phone });
        if (phoneValidation) {
          return res.status(409).json({ message: 'Phone number already exists' });
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

  
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user list." });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Validate updates and handle password hashing if necessary
      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(id, updates, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user." });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndRemove(id);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user." });
    }
  },



};

module.exports = authController;
