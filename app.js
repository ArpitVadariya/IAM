const express = require("express");
const app = express();
const port = 3000;
const bcrypt = require("bcrypt");

app.get("/", (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("myPlaintextPassword", salt, function (err, hash) {
      console.log(hash);
    });
  });
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
