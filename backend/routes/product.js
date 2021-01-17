const express = require("express");

const ProductController = require("../controllers/product");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.get("", ProductController.getProducts);
router.get("/customers",ProductController.getCustomers);

module.exports = router;
