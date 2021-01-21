const express = require("express");

const UtilController = require("../controllers/utils");

const router = express.Router();

router.get("/countries", UtilController.getCountries);
router.get("/states/:country", UtilController.getStates);
router.get("/cities/:state", UtilController.getCities);


module.exports = router;
