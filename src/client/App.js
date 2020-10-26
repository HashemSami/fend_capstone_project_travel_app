import { updateStore } from "./store";
import { formComponent } from "./js/formComponent";
import { resultComponent } from "./js/resultComponent";
import { headerComponent } from "./js/headerComponent";

export const App = (state) => {
  const {
    regionsOptions,
    countriesOptions,
    citiesOptions,
    selectedRegion,
    selectedCountry,
    selectedCity,
    url,
    text,
    note,
    analysis,
  } = state;
  //   changeName();
  return `
  <div id="container">
    <header id="head">
      ${headerComponent()}
    </header>
    <main>
      ${formComponent(
        regionsOptions,
        selectedRegion,
        countriesOptions,
        selectedCountry,
        citiesOptions,
        selectedCity,
        note
      )}
      ${resultComponent(analysis)}
    </main>

    <footer id="footer">
    <p>This is a footer</p>
    </footer>
  </div>
  `;
};

// componenets

// export const handleForm = async () => {
//   console.log("clicked");
// };

const fetchAnalysis = async () => {
  const res = await fetch("http://localhost:8081/analysis", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: store.text,
      url: store.url,
    }),
  });
  const analysis = await res.json();
  updateStore(store, {
    note: "Done. Please check the results below.",
    analysis: analysis,
  });
  return analysis;
};
