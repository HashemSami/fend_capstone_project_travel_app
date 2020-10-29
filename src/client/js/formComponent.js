import { selectRegion, selectCountry, printCountries, selectCity, printCities } from "./locationSelector";
import { updateStore } from "../index";
import { getDateString } from "./helperFunctions";

const formComponent = (selectedRegion, selectedCountry, selectedCity, note) => {
  const d = new Date();
  const currentDate = getDateString(d.getTime());

  const dFuture = new Date();
  dFuture.setDate(d.getDate() + 16);
  const futureDate = getDateString(dFuture.getTime());

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
            selectedCountry && selectedRegion && selectedCity !== selectedCountry
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
        <input required min="${currentDate}" max="${futureDate}" type="date" value="" id="date" form="usrform" placeholder="date"/>
      </div>
        <button type="button" ${selectedCountry && selectedRegion && selectedCity ? "" : "disabled"} onclick="Client.handleForm('${selectedRegion}', '${selectedCountry}', '${selectedCity}')">Check weather</button>
    </form>
    <div id="note">${note}</div>
</section>`;
};

const handleForm = async (selectedRegion, selectedCountry, selectedCity) => {
  try {
    const date = document.getElementById("date");
    const selectedDate = date.valueAsNumber;

    if (!selectedDate) {
      updateStore({
        note: "Please select a date!"
      });
      return;
    }

    await fetch("http://localhost:8081/post-data", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        region: selectedRegion,
        country: selectedCountry,
        city: selectedCity,
        date: selectedDate
      })
    });

    await updateUI();
  } catch (e) {
    console.log(e);
  }
};

const updateUI = async () => {
  try {
    const res = await fetch("http://localhost:8081/get-data");
    const data = await res.json();

    updateStore({
      tripsInfo: data.data
    });
  } catch (e) {
    return `cannot get data: ${e.message}`;
  }
};

export { formComponent, selectCountry, selectCity, handleForm };
