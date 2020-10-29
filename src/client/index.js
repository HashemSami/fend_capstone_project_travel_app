import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/header.scss";
import "./styles/result.scss";
import "./styles/form.scss";
import "./styles/main.scss";
import "./styles/card.scss";
import { App } from "./js/App";
import { selectCountry, selectCity, setCity } from "./js/locationSelector";
import { handleForm } from "./js/formComponent";

const store = {
  selectedRegion: "",
  selectedCountry: "",
  selectedCity: "",
  tripsInfo: [],
  mainNote: "",
  note: "",
};

// add our markup to the page
const root = document.getElementById("root");

export const updateStore = (newState) => {
  const newStore = Object.assign(store, newState);
  // console.log(newStore);
  render(root, newStore);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

window.addEventListener("load", () => {
  render(root, store);
});

export { handleForm, selectCountry, selectCity, setCity };
