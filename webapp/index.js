const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("Hello dogs, wow!");
  });

const port = 8080;

app.listen(port, () => {
console.log(`Look for dogs on http://localhost:${port}`);
});