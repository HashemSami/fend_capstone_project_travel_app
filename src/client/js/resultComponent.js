import { calculateRemainingDays } from "./helperFunctions";
import * as icons from "../icons";

const resultComponent = (tripsInfo, mainNote) => {
  if (tripsInfo.length === 0) {
    return `
    <h4 id="main-note">Welcome to your trips planner, please select your traveling location and date...</h4>
    `;
  }

  return ` 
  <h4 id="main-note">${mainNote}</h4>
  <section id="result">
  ${tripsInfo
    .map((trip) => {
      const {
        region,
        country,
        city,
        longitude,
        latitude,
        date,
        max_temp,
        min_temp,
        weather,
        imageURL,
        tags,
      } = trip;
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
          <img src="${icons[`${weather.icon}`]}"/>
        </div>
      </div>
    </div>
    `;
    })
    .join(" ")}
  <section/>`;
};

export { resultComponent };
