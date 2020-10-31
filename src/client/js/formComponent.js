import {
  selectRegion,
  selectCountry,
  printCountries,
  selectCity,
  printCities,
} from "./locationSelector";
import { updateStore } from "../index";
import { getDateString } from "./helperFunctions";
import { countriesData } from "./locationSelector/countriesData";

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
          <select required id="region" name="region">
          <option value="" >SELECT REGION</option>
          ${selectRegion(selectedRegion).join(" ")}
          </select>
          ${
            selectedRegion
              ? `<select required id="country" name="country">
          <option value="" >SELECT COUNTRY</option>
          ${printCountries(selectedRegion, selectedCountry).join(" ")}
          </select>`
              : ""
          }
          ${
            selectedCountry &&
            selectedRegion &&
            selectedCity !== selectedCountry
              ? `<input required id="city" name="city" value="${
                  selectedCity ? selectedCity : ""
                }" placeholder="Enter city name">`
              : ""
          }
        </div>
      </div>
      <div id="travel-date">
        <label for="date">Traveling date:</label>
        <input required min="${currentDate}" max="${futureDate}" type="date" value="" id="date" form="usrform" placeholder="date"/>
      </div>
        <button id="submit-button" type="button" ${
          selectedCountry && selectedRegion && selectedCity ? "" : "disabled"
        } >Check weather</button>
    </form>
    <div id="note">${note}</div>
</section>`;
};

const handleForm = async (selectedRegion, selectedCountry, selectedCity) => {
  try {
    const date = document.getElementById("date");
    const selectedDate = date.valueAsNumber;

    const countryInfo = countriesData.counrties.find(
      (country) => country.name === selectedCountry
    );

    // countriesData.selectedCountryInfo = countryInfo[0];

    console.log(typeof countryInfo);

    if (!selectedDate) {
      updateStore({
        note: "Please select a date!",
      });
      return;
    }

    updateStore({
      mainNote: "",
      note: "Getting information...",
    });

    const res = await fetch("http://localhost:8081/post-data", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        region: selectedRegion,
        country: selectedCountry,
        city: selectedCity,
        date: selectedDate,
        contryInfo: countryInfo,
      }),
    });

    if (res.status == 500) throw await res.json();

    await updateUI();
  } catch (e) {
    if (e.matchErr) {
      updateStore({
        mainNote:
          "Looks like the country you select doesn't match with the city you typed",
        note: "No result",
      });
      return;
    }
    updateStore({
      mainNote: `Sorry, couldn't get your information, ${e.message}, please try again!`,
      note: "No result",
    });
    // console.log(e);
  }
};

const updateUI = async () => {
  try {
    const res = await fetch("http://localhost:8081/get-data");
    const data = await res.json();

    updateStore({
      tripsInfo: data.data.reverse(),
      note: "",
      mainNote:
        "Your trip has been added, you can now add another trip to your list.",
    });
  } catch (e) {
    return `cannot get data: ${e.message}`;
  }
};

export { formComponent, selectCountry, selectCity, handleForm };
