const express = require("express");
const app = express();
const port = 3000;
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const path = require("path");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Home Route
app.get("/", (req, res) => {
  res.render("index");
});

// Create User Route
app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      console.log(`Password is ${hash}`);
      let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });

      let token = jwt.sign({ email }, "secretkey");
      console.log(`Token is ${token}`);
      res.cookie("token", token);

      res.send(createdUser);
    });
  });
});

// Login Page Route For GET
app.get("/login", function (req, res) {
  res.render("login");
});

// Login Page route For POST
app.post("/login", async function (req, res) {
  let user = await userModel.findOne({ email: req.body.email });
  console.log(user);
  if (!user) return res.send("something went wrong");
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    console.log(result);
    if (result) {
      let token = jwt.sign({ email: user.email }, "secretkey");
      console.log(`Token is ${token}`);
      res.cookie("token", token);
      res.send("YES You can login");
    } else res.send("something went wrong");
  });
});

// Logout Route
app.get("/logout", function (req, res) {
  res.cookie("token", "");
  console.log("LOGUT SUCEESSFULLY");
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
