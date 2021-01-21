const Customer = require("../models/customer");
const Product = require("../models/product");
const { GeneralError, NotFound } = require('../utils/error');
exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const customer = new Customer({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
    hobbies: req.body.hobbies
  });
 let products = req.body.products.split(",");
   for(let i of products) {
    customer.products.push(i);
  }

  customer
    .save()
    .then(createdCustomer => {
      res.status(201).json({
        message: "Customer added successfully",
        post: {
          ...createdCustomer,
          id: createdCustomer._id
        }
      });
    })
    .catch(error => {
      next(new GeneralError("Creating a customer failed!"));
    });
};

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const customer = new Customer({
    _id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    imagePath: imagePath,
    creator: req.userData.userId,
    address: req.body.address,
    city:req.body.city,
    state: req.body.state,
    country: req.body.country,
    hobbies: req.body.hobbies
  });
  let products = req.body.products.split(",");
  for(let i of products) {
   customer.products.push(i);
 }

  Customer.updateOne({ _id: req.params.id, creator: req.userData.userId }, customer)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      next(new GeneralError("Couldn't udpate post!"));
    });
};

exports.getCustomers = (req,res) =>{
  const filter = req.query.filter;
  const sort = req.query.sortOrder === "asc"?1:-1;
  const pageSize = +req.query.pageSize;
  const pageNumber = +req.query.pageNumber;
  const skip = pageSize * (pageNumber);


  Customer.aggregate([
  {
    "$match": {
        "name": { "$regex": filter, "$options": "i" }
    }
},
    { '$sort'     : { 'name' :sort} },
    { '$facet'    : {
      metaData: [ { $count: "total" }, { $addFields: { page:"total" } } ],
        data: [ { $skip: skip }, { $limit: pageSize } ] // add projection here wish you re-shape the docs
    } }
] ).then(data => {
  res.status(200).json({
    message: "Posts fetched successfully!",
    data: data[0]
  });
})
.catch(error => {
  next(new GeneralError("Fetching aggregate posts failed!"));
});

}
exports.getPost = (req, res, next) => {
  Customer.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        throw new NotFound("Customer not found!" );
      }
    })
    .catch(error => {
     next(new GeneralError("Fetching post failed!"));
    });
};

exports.deletePost = (req, res, next) => {
  Customer.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      next(new GeneralError("Deleting posts failed!"));
    });
};
