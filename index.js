'use strict';
// Let's Go...... 
const express = require('express');
const bodyParser = require('body-parser');
const router = require("./src/apis/routes/index")

const Logger = require('./src/common/lib/logger');
const { BaseError, INTERNAL_SERVER_ERROR } = require('./src/common/lib/custumError');

const cookieparser =require("cookie-parser");
const cors = require('cors');
const mongoose = require("./src/apis/db/mongoose");

const app = express();
app.use(cookieparser());  // add cookie parser package
app.use(express.json());   
app.use(express.urlencoded({extended:false}))

// Middleware
app.use(bodyParser.json());
app.use(cors());


app.use(router);


app.use(async (error, req, res, next) => {
    try {
      if (!(error instanceof BaseError)) {
        Logger.error(`Unhandled error: ${error}`);
        throw new INTERNAL_SERVER_ERROR();
      } else throw error;
    } catch (err) {
      Logger.error(`Handled error: ${err.message}`);
      await err.handleError(req, res);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
