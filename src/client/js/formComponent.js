import { selectRegion, selectCountry, selectCity } from "./locationSelector";

const formComponent = (url, text, note) => {
  let countryOptions = Client.selectCountry();
  console.log(countryOptions);
  return `
  <section id="usrform">
    <form>
      <div id="travel-location">
        <label for="location">Traveling to:</label>
        <select onchange="Client.selectCountry(this)" name="region">
        <option value="" selected="selected">SELECT REGION</option>
        ${selectRegion().join(" ")}
        </select>
        ${
          countryOptions
            ? `<select onchange="" name="country">
        <option value="" selected="selected">SELECT COUNTRY</option>
        ${countryOptions.join(" ")}
        </select>`
            : ""
        }
      </div>
      <div id="travel-date">
        <label for="date">Traveling date:</label>
        <input type="date" value="" id="date" form="usrform" placeholder="date"/>
      </div>
        <button type="button" onclick="Client.handleForm()">Check weather</button>
    </form>
    <div id="note">${note}</div>
</section>`;
};

export { formComponent, selectCountry, selectCity };
