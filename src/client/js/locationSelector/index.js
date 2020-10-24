import { countries, city_states } from "./countriesInfo";

export const selectRegion = () => {
  // loop through the regions object to add the select options
  // and add to every select option an onchange attribute to have effect on the
  // country select
  const regionsArray = Object.keys(countries);

  const optionsArray = regionsArray.map(region => {
    return `<option value="${region}">${region}</option>`;
  });

  return optionsArray;
};

export const selectCountry = regions => {
  // grab the value from the region select, then will select from the
  // country object only the values of the region, by plitting the values from
  // region object

  if (!regions) return false;

  const selectedRegion = regions.value;

  const countriesArray = countries[selectedRegion].split("|");

  const optionsArray = countriesArray.map(country => {
    return `<option value="${country}">${country}</option>`;
  });
  console.log(optionsArray);
  // printCountryOptions(optionsArray)
  return optionsArray;
};

export const selectCity = () => {
  // finally will select the city based on the value selected from the country
  // by splitting the corresponding value formthe city_state object
};
