const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require('method-override');
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let data = [
  {
    id: uuidv4(),
    username: "luffy",
    content: "sun god - NIKA",
  },
  {
    id: uuidv4(),
    username: "naruto",
    content: "child of prophecy",
  },
  {
    id: uuidv4(),
    username: "ASTA",
    content: "demon king",
  },
];

app.listen(3000, (req, res) => {
    console.log(`Server is listening on port &{port}`);
})

app.get("/post", (req, res) => {
    res.render("index.ejs", { data });
});

app.get("/post/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/post", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    data.push({ id,username, content });
    res.redirect("/post");
});

app.get("/post/:id", (req, res) => {
    let { id } = req.params;
    let post= data.find((p) => id === p.id);
   res.render("show.ejs", { post });
});

app.get("/post/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = data.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});


app.patch("/post/:id", (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = data.find((p) => id === p.id);
    post.content = newcontent;
    console.log(post);
    res.redirect("/post");
});

app.delete("/post/:id", (req, res) => {
  let { id } = req.params;
   data = data.filter((p) => id !== p.id);
    res.redirect("/post");
});