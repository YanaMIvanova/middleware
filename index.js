const express = require("express");
const fetch = require("node-fetch");
var cors = require("cors");

const port = 4000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/middleware", async (req, res) => {
  fetch("http://localhost:6000/usernames")
    .then((res) => res.json())
    .then((usernames) => res.json(usernames))
    .catch(console.log);
});

app.post("/middleware", async (req, res) => {
  const usernames = { name: `${req.body.name} - enriched` };

  fetch("http://localhost:6000/usernames", {
    method: "POST",
    body: JSON.stringify(usernames),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((usernames) => res.json(usernames))
    .catch(console.log);
});

app.listen(port, () => {
  console.log(`Middleware app listening at http://localhost:${port}`);
});
