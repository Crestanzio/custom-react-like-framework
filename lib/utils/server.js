const express = require("express");
const app = express();

// serve your css as static
app.use(express.static(`${process.cwd()}/build`));

app.get("/", (req, res) => {
  res.sendFile(`${process.cwd()}/public/index.html`);
});

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

// console.log(test._router);

// /(\w+.(css|js))(?!\.map)/