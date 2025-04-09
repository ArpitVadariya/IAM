const express = require("express");
const app = express();
const port = 3000;
const bcrypt = require("bcrypt");

app.get("/", (req, res) => {
  bcrypt.compare(
    "myPlaintextPassword",
    "$2b$10$hrIHrp8rBW7VUALlboMNKevFwrWH/3WENAc339VPc1gPTsEZzZISK",
    function (err, result) {
      console.log(result);
    }
  );
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
