const express = require("express");
const router = express.Router();
const VerifyRequestSchema = require("../middlewares/VerifyRequestSchema");

const request = require("request");

/* GET home page. */
router.get("/", [], function(req, res, next) {
  request("https://api.binance.com/api/v1/exchangeInfo", function(
    error,
    response,
    body
  ) {
    console.log("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    console.log("__");

    res.render("index", { title: "Express", body });
  });
});

module.exports = router;
