const express = require("express");

const CustomerController = require("../controllers/customer");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, CustomerController.createPost);

router.put("/:id", checkAuth, extractFile, CustomerController.updatePost);

router.get("", checkAuth,CustomerController.getCustomers);

router.get("/:id", CustomerController.getPost);

router.delete("/:id", checkAuth, CustomerController.deletePost);

module.exports = router;
