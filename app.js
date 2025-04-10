const express = require("express");
const app = express();
const port = 3000;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/", (req, res) => {
  let token = jwt.sign({ email: "arpit@example.com" }, "secretkey");
  console.log(token);
  res.cookie("token", token);
  res.send("Hello World!");
});

app.get("/read", function (req, res) {
  // console.log(`Token is ${req.cookies.token}`);
  let data = jwt.verify(req.cookies.token, "secretkey");
  console.log(data);

  res.send("Read Page");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
