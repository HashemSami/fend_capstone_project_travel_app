import { updateStore } from "./store";
import { formComponent } from "./js/formComponent";
import { resultComponent } from "./js/resultComponent";
import { headerComponent } from "./js/headerComponent";

export const App = state => {
  const { selectedRegion, selectedCountry, selectedCity, note, tripsInfo } = state;
  //   changeName();
  return `
  <div id="container">
    <header id="head">
      ${headerComponent()}
    </header>
    <main>
      ${formComponent(selectedRegion, selectedCountry, selectedCity, note)}
      ${resultComponent(tripsInfo)}
    </main>

    <footer id="footer">
    <p>This is a footer</p>
    </footer>
  </div>
  `;
};
