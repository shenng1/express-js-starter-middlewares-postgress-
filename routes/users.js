var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/:login", function(req, res, next) {
  const login = req.params.login;
  res.send("login: " + login);
});

module.exports = router;
