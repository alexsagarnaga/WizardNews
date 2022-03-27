const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const app = express();
const PORT = 1337;
// const staticMiddleware = express.static(path.join(_dirname, "public"));
// app.use(staticMiddleware);
const path = require("path");
const res = require("express/lib/response");
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(express.static("public"));
app.use(morgan("dev"));
app.get("/", (req, res) => {
  const posts = postBank.list();
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts
        .map(
          (post) => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span><a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
    
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
        )
        .join("")}
    </div>
  </body>
</html>`;
  res.send(html);
});
app.get("/posts/:id", (req, res, next) => {
  const id = req.params.id;
  const post = postBank.find(id);
  const html = `<!DOCTYPE html> <html>
  <head>
  <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
<body>
<div class="news-list">
<header><img src="/logo.png"/>Wizard News</header>
<div class='news-item'>
    <p>
      ${post.id} ${post.title}
      (by ${post.name} ${post.content}
        </p>
      
  </div> </body
  ></htm
  l>`;
  if (!post.id) {
    throw new Error("Not Found");
  }

  res.send(html);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Sorry, page not found");
});

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
