const express = require("express");
const fetch = require("node-fetch");
var cors = require("cors");

const port = 4000;

const app = express();
app.use(cors());
app.use(express.json());

const getURL = (baseURL) => `${baseURL}?apitoken=b10e246fa52ca8ce9e68245026e7ebd3a14`;

app.get("/organizations", async (req, res) => {
  fetch(getURL('http://localhost/apiv2/organization/list/recursive?page=0&limit=30'))
    .then((res) => res.json())
    .then((organizations) => res.json(organizations))
    .catch(console.log);
});

app.listen(port, () => {
  console.log(`Middleware app listening at http://localhost:${port}`);
});
