var path = require("path");
const express = require("express");
const { geoName, weatherForecast, getImage } = require("./apiCalls");
const dotenv = require("dotenv");
dotenv.config();

const dataBase = require("./mockDatabase");

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

app.post("/post-data", async (req, res) => {
  try {
    const { region, country, city, date } = req.body;

    // API calls
    const [lng, lat] = await geoName(city);
    const [max_temp, min_temp, weather] = await weatherForecast(lng, lat, date);
    const [imageURL, tags] = await getImage(region, country, city);

    const id = dataBase.data.length + 1;
    // wupdating the database
    const tripData = {
      id,
      region,
      country,
      city,
      longitude: lng,
      latitude: lat,
      date,
      max_temp,
      min_temp,
      weather,
      imageURL,
      tags,
    };
    dataBase.data.push(tripData);
    // console.log(dataBase);

    res.send("done");
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
});

app.get("/get-data", (req, res) => {
  res.send(dataBase);
});

const port = 8081;
// designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
