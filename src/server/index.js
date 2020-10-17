var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const { apiCall, validateURL } = require("./apiCall");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.static("dist"));

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
const { send } = require("process");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname);

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile("dist/index.html");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

app.post("/analysis", async (req, res) => {
  const body = req.body;
  console.log(body);

  let apiRes;

  if (body.url) {
    validateURL(body.url);
    apiRes = await apiCall((url = body.url));
  }
  if (body.text) {
    apiRes = await apiCall((text = body.text));
  }

  res.send(apiRes);
});

const port = 8081;
// designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
