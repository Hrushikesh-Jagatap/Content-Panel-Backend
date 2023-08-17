// server.js (Entry point for the backend)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const route = require("./routes/authRouter")
// const router = require("./routes/questionRoutes")

const cookieparser =require("cookie-parser");
const cors = require('cors');

const app = express();
app.use(cookieparser());  // add cookie parser package
app.use(express.json());   
app.use(express.urlencoded({extended:false}))
// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB


// Routes
app.use(route);
app.use(router);
// app.use('/api/users', require('./routes/userRoutes'));


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
