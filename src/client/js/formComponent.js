import {
  selectRegion,
  selectCountry,
  printCountries,
  selectCity,
  printCities,
} from "./locationSelector";

const formComponent = (
  regionsOptions,
  selectedRegion,
  countriesOptions,
  selectedCountry,
  citiesOptions,
  selectedCity,
  note
) => {
  const d = new Date();
  const currentDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  console.log(currentDate);
  return `
  <section id="usrform">
    <form>
      <div id="travel-location">
        <label for="location">Traveling to:</label>
        <div id="location">
          <select required id="region" onchange="Client.selectCountry(this)" name="region">
          <option value="" >SELECT REGION</option>
          ${selectRegion(selectedRegion).join(" ")}
          </select>
          ${
            selectedRegion
              ? `<select required id="country" onchange="Client.selectCity(this)" name="country">
          <option value="" >SELECT COUNTRY</option>
          ${printCountries(selectedRegion, selectedCountry).join(" ")}
          </select>`
              : ""
          }
          ${
            selectedCountry && selectedRegion && selectedCity !== "none"
              ? `<select required id="city" onchange="Client.setCity(this.value)" name="city">
          <option value="" >SELECT CITY/STATE</option>
          ${printCities(selectedCountry, selectedCity).join(" ")}
          </select>`
              : ""
          }
        </div>
      </div>
      <div id="travel-date">
        <label for="date">Traveling date:</label>
        <input required min="${currentDate}" type="date" value="" id="date" form="usrform" placeholder="date"/>
      </div>
        <button type="button" ${
          selectedCountry && selectedRegion && selectedCity ? "" : "disabled"
        } onclick="Client.handleForm()">Check weather</button>
    </form>
    <div id="note">${note}</div>
</section>`;
};

const handleForm = async () => {
  const date = document.getElementById("date");
  // const region = document.getElementById("region");
  // const country = document.getElementById("country");
  // const city = document.getElementById("city");
  const selectedDate = date.valueAsNumber;

  // calculate the dfference in days
  const current = new Date().getTime();
  const differenceInTime = selectedDate - current;
  const differenceInDayes = differenceInTime / (1000 * 3600 * 24);
  console.log(Math.floor(differenceInDayes));

  // console.log(region.value);
  // console.log(country.value);
  // console.log(city.value);

  // const res = await fetch("http://localhost:8081/get-geolocation", {
  //   method: "POST", // or 'PUT'
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     region: region,
  //     country: country,
  //     city: city,
  //   }),
  // });
};

export { formComponent, selectCountry, selectCity, handleForm };
