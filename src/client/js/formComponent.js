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
  // console.log(countryOptions);
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
        <input required type="date" value="" id="date" form="usrform" placeholder="date"/>
      </div>
        <button type="button" ${
          selectedCountry && selectedRegion && selectedCity ? "" : "disabled"
        } onclick="Client.handleForm()">Check weather</button>
    </form>
    <div id="note">${note}</div>
</section>`;
};

export { formComponent, selectCountry, selectCity };
