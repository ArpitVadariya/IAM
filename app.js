const express = require("express");
const app = express();
const port = 3000;
const userModel = require("./models/user");
const postModel = require("./models/posts");

// Home Route
app.get("/", (req, res) => {
  res.send("Hey");
});

// Create User Route
app.get("/create", async function (req, res) {
  let user = await userModel.create({
    username: "Tony",
    email: "tony@gmail.com",
    age: 51,
  });

  res.send(user);
});

app.get("/post/create", async function (req, res) {
  let post = await postModel.create({
    postdata: "I am IronMan",
    user: "6804646aa1d642a7b498c014",
  });

  let user = await userModel.findOne({ _id: "6804646aa1d642a7b498c014" });

  user.posts.push(post._id);
  await user.save();

  res.send({ post, user });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
