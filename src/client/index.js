import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/header.scss";
import "./styles/result.scss";
import "./styles/form.scss";
import "./styles/main.scss";
import { App } from "./App";
import {
  selectRegion,
  selectCountry,
  selectCity,
  setCity,
} from "./js/locationSelector";
import { handleForm } from "./js/formComponent";

const store = {
  regionsOptions: selectRegion(),
  countriesOptions: [],
  citiesOptions: [],
  selectedRegion: "",
  selectedCountry: "",
  selectedCity: "",
  text: "",
  url: "",
  note: "",
  analysis: {},
};

// add our markup to the page
const root = document.getElementById("root");

// pass this function to other components
export const updateStore = (newState) => {
  const newStore = Object.assign(store, newState);
  console.log(newStore);
  render(root, newStore);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

window.addEventListener("load", () => {
  render(root, store);
});

export { handleForm, selectCountry, selectCity, setCity };
