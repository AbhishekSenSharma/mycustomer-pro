const Product = require("../models/product");
const Customer = require("../models/customer");
const { GeneralError, NotFound } = require('../utils/error');

exports.getProducts = (req, res, next) => {
  Product.find({})
    .then(products => {
      if (products) {
        res.status(200).json(products);
      } else {
        throw new NotFound("Products not found!" );
      }
    })
    .catch(error => {
     next(new GeneralError("Fetching products failed!"));
    });
};

exports.getCustomers =(req, res, next) => {
  Customer
.find({ })
.populate('products')
    .then(products => {
      if (products) {
        res.status(200).json(products);
      } else {
        throw new NotFound("Products not found!" );
      }
    })
    .catch(error => {
     next(new GeneralError("Fetching products failed!"));
    });
};
