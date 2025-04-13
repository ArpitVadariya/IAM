const express = require("express");
const app = express();
const port = 3000;

const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");
const path = require("path");

const userModel = require("./models/user");
const { error } = require("console");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      console.log(hash);
      let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });

      res.send(createdUser);
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
