var path = require("path");
const express = require("express");
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname);

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile("dist/index.html");
});

app.post("/get-geolocation", async (req, res) => {
  try {
    const body = req.body;
    const message = "Invalid URL, please make sure you type the right URL";

    let apiRes;
    const validURL = validateURL(body.url);

    if (body.url && validURL) {
      apiRes = await apiCall(null, body.url);
      if (apiRes.status.code == "212") throw { err: message };
    } else {
      if (body.text) {
        apiRes = await apiCall(body.text);
      } else {
        throw { err: message };
      }
    }
    res.send(apiRes);
  } catch (e) {
    res.send(e);
  }
});

const port = 8081;
// designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
