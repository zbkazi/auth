const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const port = process.env.PORT || 4000

app.get("/", (_req, res) => {
  res.status(200).send({ 
    success: true,
    message: "Welcome to Blog API v1.0.0",
    version: "v1.0.0",
    author: "zbkazi",
    github: "https://github.com/zbkazi",
    docs: "https://github.com/zbkazi/auth",
    thanks: "Thank you for using this API",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
