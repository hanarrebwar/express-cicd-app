const express = require("express");
//testtt
const app = express();
app.use(express.json());

// Small piece of business logic so we have something to unit-test
function add(a, b) {
  return a + b;
}

app.get("/", (req, res) => {
  res.json({ message: "Hello from the CI/CD pipeline!", status: "ok" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.get("/add/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  res.json({ result: add(a, b) });
});

module.exports = { app, add };
