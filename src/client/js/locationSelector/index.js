import { countries, city_states } from "./countriesInfo";
import { updateStore } from "../../index";

export const selectRegion = selectedRegion => {
  // loop through the regions object to add the select options
  // and add to every select option an onchange attribute to have effect on the
  // country select

  const regionsArray = Object.keys(countries);

  const optionsArray = regionsArray.map(region => {
    return `<option value="${region}" ${selectedRegion === region ? "selected" : ""}>${region}</option>`;
  });
  return optionsArray;
};

export const selectCountry = regions => {
  // grab the value from the region select, then will select from the
  // country object only the values of the region, by plitting the values from
  // region object

  const selectedRegion = regions.value;
  if (!selectedRegion) {
    updateStore({
      selectedRegion: null,
      selectedCountry: null,
      selectedCity: null
    });
    return false;
  }

  updateStore({
    selectedRegion: selectedRegion,
    selectedCountry: null,
    selectedCity: null
  });
};

export const printCountries = (selectedRegion, selectedCountry) => {
  const countriesArray = countries[selectedRegion].split("|");

  const optionsArray = countriesArray.map(country => {
    return `<option value="${country}" ${selectedCountry === country ? "selected" : ""}>${country}</option>`;
  });
  return optionsArray;
};

export const selectCity = countries => {
  // finally will select the city based on the value selected from the country
  // by splitting the corresponding value formthe city_state object
  const selectedCountry = countries.value;

  if (!selectedCountry) {
    updateStore({
      selectedCountry: null,
      selectedCity: null
    });
    return false;
  }

  if (!city_states[selectedCountry]) {
    return updateStore({
      selectedCity: selectedCountry,
      selectedCountry: selectedCountry
    });
  }

  updateStore({
    selectedCountry: selectedCountry
  });
};

export const setCity = city => {
  if (!city) {
    updateStore({
      selectedCity: null
    });
    return false;
  }
  updateStore({
    selectedCity: city
  });
};

export const printCities = (selectedCountry, selectedCity) => {
  const citiesArray = city_states[selectedCountry].split("|");

  const optionsArray = citiesArray.map((city, i) => {
    if (i === 0) return;
    return `<option value="${city}" ${selectedCity === city ? "selected" : ""}>${city}</option>`;
  });
  return optionsArray;
};
