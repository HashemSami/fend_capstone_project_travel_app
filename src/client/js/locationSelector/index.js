import { countries, city_states } from "./countriesInfo";
import { countriesData } from "./countriesData";
import { updateStore } from "../../index";

export const selectRegion = (selectedRegion) => {
  // loop through the regions object to add the select options
  // and add to every select option an onchange attribute to have effect on the
  // country select

  const optionsArray = countriesData.regions.map((region) => {
    return `<option value="${region}" ${
      selectedRegion === region ? "selected" : ""
    }>${region}</option>`;
  });
  return optionsArray;
};

export const selectCountry = async (regions) => {
  // grab the value from the region select, then will select from the
  // country object only the values of the region, by plitting the values from
  // region object
  try {
    const selectedRegion = regions.value;
    console.log(selectedRegion);
    if (!selectedRegion) {
      updateStore({
        selectedRegion: null,
        selectedCountry: null,
        selectedCity: null,
      });
      return false;
    }

    updateStore({
      note: "getting countries data..",
    });

    const res = await fetch(
      `https://restcountries.eu/rest/v2/region/${selectedRegion}`
    );

    const data = await res.json();
    // console.log(data);

    countriesData.counrties = data;

    updateStore({
      selectedRegion: selectedRegion,
      selectedCountry: null,
      selectedCity: null,
      note: "",
    });
  } catch (e) {}
};

export const printCountries = (selectedRegion, selectedCountry) => {
  const optionsArray = countriesData.counrties.map((country) => {
    const { name } = country;
    return `<option value="${name}" ${
      selectedCountry === name ? "selected" : ""
    }>${name}</option>`;
  });
  return optionsArray;
};

export const selectCity = async (countries) => {
  // finally will select the city based on the value selected from the country
  // by splitting the corresponding value formthe city_state object
  const selectedCountry = countries.value;

  if (!selectedCountry) {
    updateStore({
      selectedCountry: null,
      selectedCity: null,
    });
    return false;
  }

  console.log(selectedCountry);

  // if (!city_states[selectedCountry]) {
  //   return updateStore({
  //     selectedCity: selectedCountry,
  //     selectedCountry: selectedCountry,
  //   });
  // }

  updateStore({
    selectedCountry: selectedCountry,
  });
};

export const setCity = (city) => {
  const selectedCity = city.value;
  if (!selectedCity) {
    updateStore({
      selectedCity: null,
    });
    return false;
  }
  updateStore({
    selectedCity: selectedCity,
  });
};

export const printCities = (selectedCountry, selectedCity) => {
  const citiesArray = city_states[selectedCountry].split("|");

  const optionsArray = citiesArray.map((city, i) => {
    if (i === 0) return;
    return `<option value="${city}" ${
      selectedCity === city ? "selected" : ""
    }>${city}</option>`;
  });
  return optionsArray;
};
