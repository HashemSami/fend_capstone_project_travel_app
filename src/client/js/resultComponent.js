import { calculateRemainingDays } from "./helperFunctions";
import { t01d } from "../icons";

const resultComponent = tripsInfo => {
  if (tripsInfo.length === 0) {
    return `
    <section id="result">
    <div id="card">
      <div id="photo"><img alt="Paris" src="https://pixabay.com/get/57e8d7414c53a814f1dc846096293f76133bd7ed554c704f752c73dd904fcc50_640.jpg"/></div>
      <div id="info">
        <p id="card-title">Your trip To: </p>
        <p><span>Saudi Arabia, Jeddah</pan></p>
        <p>Days Remaining:</p>
        <p><span>10 days<span></p>
        <hr>
        <table>
          <tr>
            <th>Longitude</td>
            <th>Latitude</td>
          </tr>
          <tr>
            <td><span>156.6</span></td>
            <td><span>54.6</span></td>
          </tr>
        </table>

        <table>
          <tr>
            <th>Max temp</td>
            <th>Min temp</td>
          </tr>
          <tr>
            <td><span>23</span></td>
            <td><span>15</span></td>
          </tr>
        </table>
        <hr>
        <p>Weather forecast:</p>
        <div id="wether-dis">
          <p><span>mostly cloudy<span></p>
          <img src="${t01d}"/>
          <div style="background-image: url(${t01d});"></div>
        </div>
      </div>
    </div>
    <section/>`;
  }

  return ` 
  <section id="result">
  ${tripsInfo
    .map(trip => {
      const { region, country, city, longitude, latitude, date, max_temp, min_temp, weather, imageURL, tags } = trip;
      const remainingDays = calculateRemainingDays(date);
      return `
      <div id="card">
      <div id="photo"><img alt="${tags}" src="${imageURL}"/></div>
      <div id="info">
        <p id="card-title">Your trip To: </p>
        <p><span>${country}, ${city}</pan></p>
        <p>Days Remaining:</p>
        <p><span>${remainingDays} day/s<span></p>
        <hr>
        <table>
          <tr>
            <th>Longitude</td>
            <th>Latitude</td>
          </tr>
          <tr>
            <td><span>${longitude}</span></td>
            <td><span>${latitude}</span></td>
          </tr>
        </table>

        <table>
          <tr>
            <th>Max temp</td>
            <th>Min temp</td>
          </tr>
          <tr>
            <td><span>${max_temp} &#8451;</span></td>
            <td><span>${min_temp} &#8451;</span></td>
          </tr>
        </table>
        <hr>
        <p>Weather forecast:</p>
        <div id="wether-dis">
          <p><span>${weather.description}<span></p>
          <p><span>${weather.icon}<span></p>
        </div>
      </div>
    </div>
    `;
    })
    .join(" ")}
  <section/>`;
};

export { resultComponent };
