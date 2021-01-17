const path = require("path");
const logger = require("./utils/logger");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const handleErrors = require('./middleware/handleErrors');

const customerRoutes = require("./routes/customer");
const userRoutes = require("./routes/user");
const utilRoutes = require("./routes/util");
const productRoutes = require("./routes/product");


const app = express();
require('./db/mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
logger.stream = {
  write: function(message){
      logger.info(message);
  }
};
app.use(require("morgan")("combined", { "stream": logger.stream }));
app.use("/api/customer", customerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/util", utilRoutes);
app.use("/api/product", productRoutes);
//app.use(require('morgan')({ "stream": logger.stream }));

app.use(handleErrors);
module.exports = app;
