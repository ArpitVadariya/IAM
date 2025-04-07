const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.cookie("name", "ARPIT");
  console.log("server started");

  res.send("Done");
});

app.listen(3000);
